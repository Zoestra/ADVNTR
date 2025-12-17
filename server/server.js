import bcrypt from 'bcryptjs';
import cors from "cors";
import express from "express";
import path from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// For ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.method === 'POST' && req.body) {
        console.log('Request body:', JSON.stringify(req.body));
    }
    next();
});

// Database connection
const dbPath = path.join(__dirname, './users.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        console.error('Database path attempted:', dbPath);
    } else {
        console.log('Connected to SQLite database at:', dbPath);
        
        // Create users table if it doesn't exist (with role column)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT CHECK(role IN ('DM', 'Player')) NOT NULL DEFAULT 'Player',
            location TEXT,
            schedule TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Users table is ready (with role column)');
                
                // Try to add role column if table exists without it (safe to run multiple times)
                db.run(`ALTER TABLE users ADD COLUMN role TEXT CHECK(role IN ('DM', 'Player')) DEFAULT 'Player'`, (err) => {
                    if (err && !err.message.includes('duplicate column name')) {
                        // It's OK if column already exists
                    }
                });
            }
        });
    }
});

// Test endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is running',
        endpoints: {
            login: 'POST /login',
            register: 'POST /create-account',
            test: 'GET /test'
        }
    });
});

// Simple test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint works!' });
});

// Login endpoint
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        
        console.log('Login attempt for username:', username);
        
        if (!username || !password) {
            return res.status(400).json({ 
                success: false,
                error: 'Username and password are required' 
            });
        }

        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    success: false,
                    error: 'Database error',
                    details: err.message 
                });
            }
            
            if (!row) {
                console.log('User not found:', username);
                return res.status(401).json({ 
                    success: false,
                    error: 'Invalid credentials' 
                });
            }

            bcrypt.compare(password, row.password, (err, match) => {
                if (err) {
                    console.error('Password comparison error:', err);
                    return res.status(500).json({ 
                        success: false,
                        error: 'Server error' 
                    });
                }
                
                if (match) {
                    // Remove password from response
                    const { password: _, ...userWithoutPassword } = row;
                    console.log('Login successful for:', username, 'Role:', userWithoutPassword.role);
                    res.json({ 
                        success: true,
                        message: 'Login successful', 
                        user: userWithoutPassword 
                    });
                } else {
                    console.log('Invalid password for:', username);
                    res.status(401).json({ 
                        success: false,
                        error: 'Invalid credentials' 
                    });
                }
            });
        });
    } catch (error) {
        console.error('Login endpoint error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
        });
    }
});

// Create account endpoint
app.post('/create-account', (req, res) => {
    try {
        const { username, password, role, location, schedule } = req.body;
        
        console.log('Registration attempt:', { 
            username, 
            password: password ? '***' : 'missing',
            role,
            location, 
            schedule 
        });
        
        // Input validation
        if (!username || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                success: false,
                error: 'Username and password are required',
                received: { username, hasPassword: !!password, password, role, location, schedule }
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters'
            });
        }

        // Validate role
        const validRoles = ['DM', 'Player'];
        const userRole = role || 'Player'; // Default to Player if not specified
        if (!validRoles.includes(userRole)) {
            return res.status(400).json({
                success: false,
                error: 'Role must be either "DM" or "Player"'
            });
        }

        // Check if user exists first
        db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                console.error('Database SELECT error:', err);
                return res.status(500).json({ 
                    success: false,
                    error: 'Database error',
                    details: err.message 
                });
            }
            
            if (row) {
                console.log('User already exists:', username);
                return res.status(409).json({ 
                    success: false,
                    error: 'Username already exists',
                    username: username 
                });
            }

            // Hash password and create user
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Hashing error:', err);
                    return res.status(500).json({ 
                        success: false,
                        error: 'Server error',
                        details: err.message 
                    });
                }

                const sql = 'INSERT INTO users (username, password, role, location, schedule) VALUES (?, ?, ?, ?, ?)';
                console.log('Executing SQL insert for user:', username, 'role:', userRole);
                
                db.run(sql, [username, hashedPassword, userRole, location || null, schedule || null], function(err) {
                    if (err) {
                        console.error('Database INSERT error:', err);
                        return res.status(500).json({ 
                            success: false,
                            error: 'Failed to create account',
                            details: err.message 
                        });
                    }
                    
                    console.log('Account created successfully. ID:', this.lastID, 'Role:', userRole);
                    res.status(201).json({ 
                        success: true,
                        message: 'Account created successfully',
                        userId: this.lastID,
                        username: username,
                        role: userRole
                    });
                });
            });
        });
    } catch (error) {
        console.error('Registration endpoint error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
        });
    }
});

// Users endpoint

app.get(`/users`, (req, res) => {
    const { role, location, schedule, username } = req.query;

    const conditions = [];
    const parameters = [];

    if(role){
        conditions.push(`LOWER(role) = LOWER(?)`);
        parameters.push(role);
    }

    if(location){
        conditions.push(`LOWER(location) LIKE LOWER(?)`);
        parameters.push(`%${location}%`);
    }

    if(schedule){
        conditions.push(`LOWER(schedule) LIKE LOWER(?)`);
        parameters.push(`%${schedule}%`);
    }

    if(username){
        conditions.push(`LOWER(username) = LOWER(?)`);
        parameters.push(username);
    }

    let sql = `SELECT id, username, role, location, schedule, created_at FROM users `;

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    sql+=`ORDER BY id`;

    db.all(sql, parameters, (err, rows) => {
        if(err){
            console.error('SQL ERROR:', err.message);
            console.error('SQL QUERY:', sql);
            console.error('SQL PARAMS:', params);
            return res.status(500).json({ 
                success: false,
                error: err.message 
            });
        };

        res.json({
            success: true,
            count: rows.length,
            users: rows,
            timestamp: new Date().toISOString()
        });
    })
})

// endpoint for campaigns
app.get(`/campaigns`, (req,res) => {
    console.log('DEBUG: Fetching all campaigns');
    
    db.all('SELECT id, name, location, schedule, created_at FROM campaigns ORDER BY id', (err, rows) => {
        if (err) {
            console.error('Error fetching campaigns:', err);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        
        console.log(`Found ${rows.length} campaigns`);
        res.json({
            success: true,
            count: rows.length,
            users: rows,
            timestamp: new Date().toISOString()
        });
    });
})

// Debug endpoint to view all users (REMOVE THIS IN PRODUCTION!)
app.get('/api/debug/users', (req, res) => {
    console.log('DEBUG: Fetching all users');
    
    db.all('SELECT id, username, role, location, schedule, created_at FROM users ORDER BY id', (err, rows) => {
        if (err) {
            console.error('DEBUG: Error fetching users:', err);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        
        console.log(`DEBUG: Found ${rows.length} users`);
        res.json({
            success: true,
            count: rows.length,
            users: rows,
            timestamp: new Date().toISOString()
        });
    });
});

// Debug endpoint to view database info
app.get('/api/debug/db-info', (req, res) => {
    console.log('DEBUG: Getting database info');
    
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({
            success: true,
            tables: tables.map(t => t.name),
            database: 'users.db',
            serverTime: new Date().toISOString()
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
    });
});

// =====================
// UPDATE USERNAME
// =====================
app.put("/api/update-username", (req, res) => {
const { userId, newUsername } = req.body;

if (!userId || !newUsername) {
    return res.status(400).json({ error: "Missing fields" });
}

db.run(
    "UPDATE users SET username = ? WHERE id = ?",
    [newUsername, userId],
    function (err) {
    if (err) {
        if (err.message.includes("UNIQUE")) {
        return res.status(409).json({ error: "Username already taken" });
        }
        return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true, username: newUsername });
    }
);
});

// =====================
// UPDATE PASSWORD
// =====================
app.put("/api/update-password", (req, res) => {
const { userId, currentPassword, newPassword } = req.body;

if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "Missing fields" });
}

db.get("SELECT password FROM users WHERE id = ?", [userId], (err, row) => {
    if (err || !row) {
    return res.status(404).json({ error: "User not found" });
    }

    bcrypt.compare(currentPassword, row.password, (err, match) => {
    if (!match) {
        return res.status(401).json({ error: "Incorrect password" });
    }

    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
        return res.status(500).json({ error: "Hash error" });
        }

        db.run(
        "UPDATE users SET password = ? WHERE id = ?",
        [hash, userId],
        () => res.json({ success: true })
        );
    });
    });
});
});

// =====================
// DELETE ACCOUNT
// =====================
app.delete("/api/delete-account", (req, res) => {
const { userId } = req.body;

if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
}

db.run("DELETE FROM users WHERE id = ?", [userId], err => {
    if (err) {
    return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true });
});
});


// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Endpoint not found',
        requestedUrl: req.url 
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Test endpoint: http://localhost:${port}/test`);
    console.log(`Database path: ${dbPath}`);
    console.log(`Debug endpoints available:`);
    console.log(`  - http://localhost:${port}/api/debug/users`);
    console.log(`  - http://localhost:${port}/api/debug/db-info`);
});