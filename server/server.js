// Importing the express library
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Placeholder for storing users (in-memory)
let users = [
    { username: 'user1', password: 'password' }
];

// POST endpoint for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulate user authentication
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Login failed');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});