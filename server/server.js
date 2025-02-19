const express = require('express');
const app = express();
const port = 3000;

const budget = {
    myBudget: [
        {
            title: 'Eat Out',
            budget: 30
        },
        {
            title: 'Rent',
            budget: 350
        },
        {
            title: 'Groceries',
            budget: 90
        }
    ]
};

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle the /budget route
app.get('/budget', (req, res) => {
    res.json(budget);
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});