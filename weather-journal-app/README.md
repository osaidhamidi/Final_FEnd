# Travel Planner Application

A web application that helps users plan trips by providing weather forecasts, destination images, and trip countdowns. Integrates with Geonames, Weatherbit, and Pixabay APIs to deliver real travel insights.

## Features

- Destination Search: Find locations using Geonames database
- Weather Forecast: Get 14-day weather predictions from Weatherbit API
- Destination Images: Display location images from Pixabay
- Trip Countdown: Automatic days-until-trip calculation
- Offline Capabilities: Service Worker implementation using Workbox
- Responsive Design: Built with Sass for styling


## Running the Application

- Development mode: `npm run build-dev`
- Production build: `npm run build-prod`
- Start server: `npm start`
- Run tests: `npm test`

## Dependencies
- express
- cors
- dotenv
- body-parser
- workbox-webpack-plugin

## Development Dependencies
- webpack
- babel
- sass
- jest
- clean-webpack-plugin
- html-webpack-plugin

## Project Structure
weather-journal-app/
│── README.md
│── .gitignore
│── .babelrc
│── webpack.dev.js
│── webpack.prod.js
│── package.json
│── package-lock.json
│── dist/
│── __tests__/
│   │── app.test.js
│   │── server.test.js
│── src/
│   │── index.js
│   │── server/
│   │   │── server.js
│   │── client/
│   │   │── styles/
│   │   │   │── main.scss
│   │   │── views/
│   │   │   │── index.html
│   │   │── js/
│   │   │   │── app.js


## ## 📋 Installation & Setup

- Clone repository:
   ```bash
   git clone https://github.com/osaidhamidi/Final_FEnd.git
   ```
- Install dependencies:
```bash
npm install
```

## License
none.