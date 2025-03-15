# Travel Planner Application

This app allows users to plan trips by entering a destination and date. It then displays information about the location: weather forecast, a countdown to the trip, and an image of the destination.

## Features

- Enter a destination and a departure date
- View weather forecast for your trip date.
- See a countdown of days until your trip
- View an image of your destination
- Save trip (mock)
- Remove trip 


## Installation

1. Clone this repository
2. Run `npm install` 
3. Obtain your own API keys from Geonames, Weatherbit, and Pixabay
4. Replace API credentials in `src/client/js/app.js`:
   ```javascript
   const geonamesUsername = 'yourUsername';
   const weatherbitApiKey = 'yourApiKey';
   const pixabayApiKey = 'yourApiKey';
   ```

## Running the Application

- Development mode: `npm run build-dev`
- Production build: `npm run build-prod`
- Start server: `npm start`
- Run tests: `npm test`

## Dependencies

- Express
- Cors
- bodyParser
- Webpack
- Babel
- Sass
- Jest
