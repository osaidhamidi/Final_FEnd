const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
let projectData = {};


// port
const port = 8000;





// Middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../dist')));


// Geonames API endpoint
app.get('/geonames', async function (req, res) {
    const { location } = req.query;
    try {

        const response = await fetch(
            `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`
        );
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: ' geonames api error ' });
    }

});


// POST : save trip data
app.post('/add', (req, res) => {
    const data = req.body;
    projectData = {
        location: data.location,
        date: data.date,
        weather: data.weather,
        imageUrl: data.imageUrl,
        countdown: data.countdown
    };
    res.send(projectData);
});

// Start server
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
