import '../styles/main.scss';

//API configs
const geonamesUsername = 'osaidhamidi';
const weatherKey = '6b687a45e3ac4b11aea1d6983053ddae';
const pixKey = '49315272-4675732d36c9be39ae79139a9';

// App Initialization
function initializeApp() {

    // DOM Element References
    const tripForm = document.getElementById('trip-form');

    const tripDetails = document.getElementById('trip-details');

    const locationInput = document.getElementById('location');

    const dateInput = document.getElementById('departure-date');

    const locationImage = document.getElementById('location-image');

    const tripLocation = document.getElementById('trip-location');

    const tripDate = document.getElementById('trip-date');

    const countdown = document.getElementById('countdown');

    const weatherInfo = document.getElementById('weather-info');

     // Event listeners
    tripForm.addEventListener('submit', handleFormSubmit);

    document.querySelector('.save-trip').addEventListener('click', saveTrip);

    document.querySelector('.remove-trip').addEventListener('click', removeTrip);


    const today = new Date();

    const maxDate = new Date();

    maxDate.setDate(today.getDate() + 14);

    dateInput.min = today.toISOString().split("T")[0];

    dateInput.max = maxDate.toISOString().split("T")[0];

    // Handle Form Submission
    async function handleFormSubmit(event) {

        event.preventDefault();


        // Date validation
        const location = locationInput.value;

        const date = new Date(dateInput.value);

        const today = new Date();

        const maxAllowedDate = new Date();

        maxAllowedDate.setDate(today.getDate() + 14);

        if (date > maxAllowedDate) {
            alert('Please select a date within the next 14 days.');
            return;
        }


        try {

            // API calls
            const geoData = await getGeonamesData(location);

            const weather = await getWeatherbitData(geoData.lat, geoData.lng, dateInput.value);

            const imageUrl = await getPixabayImage(location, geoData.countryName);

            updateUI({
                location: `${location}, ${geoData.countryName}`,
                date: formatDate(dateInput.value),
                countdown: calculateCountdown(dateInput.value),
                weather: `${weather.temp} celsius , ${weather.description}`,
                imageUrl
            });

            // Trip data object
            const tripData = {
                location: `${location}, ${geoData.countryName}`,
                date: dateInput.value,
                weather: {
                    temp: weather.temp,
                    description: weather.description
                },
                imageUrl: imageUrl,
                countdown: calculateCountdown(dateInput.value)
            };

            // Send data to server
            await postTripData(tripData);


            tripDetails.style.display = 'flex';
        } catch (error) {
            alert(' error : ' + error.message);
        }
    }



    // API helper functions

    // Convert location to coordinates
    async function getGeonamesData(location) {
        const response = await fetch(
            `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesUsername}`
        );
        const data = await response.json();
        if (!data.geonames?.length) throw new Error(' not found ');
        return {

            lat: data.geonames[0].lat,

            lng: data.geonames[0].lng,

            countryName: data.geonames[0].countryName
        };
    }

    // Weather forecast
    async function getWeatherbitData(lat, lng, date) {

        const response = await fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherKey}`
        );
        const data = await response.json();

        const forecast = data.data.find(d => d.valid_date === date);

        return {
            temp: forecast.temp,

            description: forecast.weather.description
        };
    }

    
    async function postTripData(data) {
        try {
            const response = await fetch('/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const serverData = await response.json();
            console.log('Data saved:', serverData);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Location image
    async function getPixabayImage(location, country) {

        const response = await fetch(
            `https://pixabay.com/api/?key=${pixKey}&q=${location}&image_type=photo`
        );
        const data = await response.json();

        if (!data.hits.length) {
            const countryResponse = await fetch(
                `https://pixabay.com/api/?key=${pixKey}&q=${country}&image_type=photo`
            );
            const countryData = await countryResponse.json();

            return countryData.hits[0]?.webformatURL || '';
        }
        return data.hits[0].webformatURL;
    }


    // UI update functions

    // Reflect data in DOM
    function updateUI({ location, date, countdown: days, weather, imageUrl }) {

        tripLocation.textContent = location;

        tripDate.textContent = date;

        countdown.textContent = days;

        weatherInfo.textContent = weather;

        locationImage.src = imageUrl;
    }

    // Date display
    function formatDate(dateString) {

        const date = new Date(dateString);

        return date.toLocaleDateString('en-GB');
    }


    // Days remaining
    function calculateCountdown(dateString) {

        const tripDate = new Date(dateString);
        const today = new Date();

        return Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));
    }

    // Pop alert (proof of conept)
    function saveTrip() {
        alert(' trip is saved (not really :) ) ');
    }

    // Remove trip information
    function removeTrip() {

        tripForm.reset();

        tripDetails.style.display = 'none';
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initializeApp);
export { initializeApp as main };


