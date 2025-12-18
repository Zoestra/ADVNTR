import sqlite3 from "sqlite3";
import bcrypt from 'bcryptjs';
import path from "path";
import { fileURLToPath } from "url";
import { Campaign_data } from "./Data/Campaign_data.js";
import { DM_data } from "./Data/DM_data.js";
import { Player_data } from "./Data/Player_data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, './server/users.db');
const db = new sqlite3.Database(dbPath);

// Default password for all dummy users
const DEFAULT_PASSWORD = "password123";

async function seedDatabase() {
    console.log("Starting database seed...");
    console.log("Database path:", dbPath);

    // Hash the default password once
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    // Create users table if it doesn't exist
    await new Promise((resolve, reject) => {
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
                console.error('Error creating users table:', err);
                reject(err);
            } else {
                console.log('✓ Users table is ready');
                resolve();
            }
        });
    });

    // Create campaigns table if it doesn't exist
    await new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS campaigns (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT,
            schedule TEXT,
            dm INTEGER,
            style TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (dm) REFERENCES users(id)
        )`, (err) => {
            if (err) {
                console.error('Error creating campaigns table:', err);
                reject(err);
            } else {
                console.log('✓ Campaigns table is ready');
                resolve();
            }
        });
    });

    // Insert DMs
    console.log("\n--- Inserting DMs ---");
    for (const dm of DM_data) {
        await new Promise((resolve) => {
            db.run(
                `INSERT INTO users (username, password, role, location, schedule) VALUES (?, ?, ?, ?, ?)`,
                [dm.name, hashedPassword, 'DM', dm.location, dm.schedule],
                function(err) {
                    if (err) {
                        if (err.message.includes('UNIQUE constraint failed')) {
                            console.log(`  DM ${dm.name} already exists, skipping...`);
                        } else {
                            console.error(`  Error inserting DM ${dm.name}:`, err);
                        }
                    } else {
                        console.log(`✓ Inserted DM: ${dm.name} (ID: ${this.lastID})`);
                    }
                    resolve();
                }
            );
        });
    }

    // Insert Players
    console.log("\n--- Inserting Players ---");
    for (const player of Player_data) {
        await new Promise((resolve) => {
            db.run(
                `INSERT INTO users (username, password, role, location, schedule) VALUES (?, ?, ?, ?, ?)`,
                [player.name, hashedPassword, 'Player', player.location, player.schedule],
                function(err) {
                    if (err) {
                        if (err.message.includes('UNIQUE constraint failed')) {
                            console.log(`  Player ${player.name} already exists, skipping...`);
                        } else {
                            console.error(`  Error inserting Player ${player.name}:`, err);
                        }
                    } else {
                        console.log(`✓ Inserted Player: ${player.name} (ID: ${this.lastID})`);
                    }
                    resolve();
                }
            );
        });
    }

    // Insert Campaigns
    console.log("\n--- Inserting Campaigns ---");
    for (const campaign of Campaign_data) {
        await new Promise((resolve) => {
            db.run(
                `INSERT OR REPLACE INTO campaigns (id, name, location, schedule, dm, style) VALUES (?, ?, ?, ?, ?, ?)`,
                [campaign.id, campaign.name, campaign.location, campaign.schedule, campaign.dm, campaign.style],
                function(err) {
                    if (err) {
                        console.error(`  Error inserting campaign ${campaign.name}:`, err);
                    } else {
                        console.log(`✓ Inserted Campaign: ${campaign.name} (ID: ${campaign.id})`);
                    }
                    resolve();
                }
            );
        });
    }

    console.log("\n✓ Database seeding complete!");
    console.log(`\nLogin credentials for all users:`);
    console.log(`  Password: ${DEFAULT_PASSWORD}`);
    console.log(`  Example: Username "Alice", Password "${DEFAULT_PASSWORD}"`);
    
    // Display summary
    await new Promise((resolve) => {
        db.get(`SELECT COUNT(*) as count FROM users WHERE role = 'DM'`, (err, row) => {
            if (!err) console.log(`\nTotal DMs: ${row.count}`);
            resolve();
        });
    });

    await new Promise((resolve) => {
        db.get(`SELECT COUNT(*) as count FROM users WHERE role = 'Player'`, (err, row) => {
            if (!err) console.log(`Total Players: ${row.count}`);
            resolve();
        });
    });

    await new Promise((resolve) => {
        db.get(`SELECT COUNT(*) as count FROM campaigns`, (err, row) => {
            if (!err) console.log(`Total Campaigns: ${row.count}`);
            resolve();
        });
    });
    
    db.close();
}

seedDatabase().catch(console.error);

