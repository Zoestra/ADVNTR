import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from 'bcryptjs';
import cors from "cors";
import path from "path";
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
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        
        // Create users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            location TEXT,
            schedule TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Users table is ready');
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
                    const { password: _, ...userWithoutPassword } = row; // Fix: Rename unused password variable
                    console.log('Login successful for:', username);
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
        const { username, password, location, schedule } = req.body;
        
        console.log('Registration attempt:', { 
            username, 
            password: password ? '***' : 'missing',
            location, 
            schedule 
        });
        
        // Input validation
        if (!username || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                success: false,
                error: 'Username and password are required',
                received: { username, hasPassword: !!password, location, schedule }
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters'
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

                const sql = 'INSERT INTO users (username, password, location, schedule) VALUES (?, ?, ?, ?)';
                console.log('Executing SQL insert for user:', username);
                
                db.run(sql, [username, hashedPassword, location || null, schedule || null], function(err) {
                    if (err) {
                        console.error('Database INSERT error:', err);
                        return res.status(500).json({ 
                            success: false,
                            error: 'Failed to create account',
                            details: err.message 
                        });
                    }
                    
                    console.log('Account created successfully. ID:', this.lastID);
                    res.status(201).json({ 
                        success: true,
                        message: 'Account created successfully',
                        userId: this.lastID,
                        username: username
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
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
});