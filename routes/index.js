const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', async (req, res) => {
    try {
        const users = await User.find();
        res.render('profile', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// routes/index.js

router.post('/add-user', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).send('Username cannot be empty');
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Create a new user
        const newUser = await User.create({ username });

        // Optionally, you can send back the new user data as JSON
        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
