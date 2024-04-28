// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize vote counts
let votes = {
    sardar: 0,
    kashif: 0
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/vote', (req, res) => {
    const { candidate } = req.body;
    if (candidate === 'sardar' || candidate === 'kashif') {
        votes[candidate]++;
        res.redirect('/');
    } else {
        res.status(400).send('Invalid candidate');
    }
});

app.get('/results', (req, res) => {
    res.json(votes);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
