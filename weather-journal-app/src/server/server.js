require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const port =  8000;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../dist')));




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


app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
