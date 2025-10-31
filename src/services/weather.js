const OWM_API_URL = 'https://api.openweathermap.org';
const API_KEY = '3be8473c35cadb12ad4c6e3aecae7d2b';

export async function getCityWeather(city, date) {
    if (!API_KEY || !city || !date) {
        console.error("API Key, city, or date is missing.");
        return 'N/A';
    }

    try {
        const geoUrl = `${OWM_API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            console.warn(`City not found: ${city}`);
            return 'N/A';
        }

        const { lat, lon } = geoData[0];
        
        const forecastUrl = `${OWM_API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (forecastData.list) {
            const targetDate = date.substring(0, 10);

            const dailyForecast = forecastData.list.find(item => {
                return item.dt_txt.startsWith(targetDate);
            });
            
            if (dailyForecast && dailyForecast.weather && dailyForecast.weather.length > 0) {
                return dailyForecast.weather[0].main; 
            }
        }

        return 'N/A';
    } catch (error) {
        console.error("Error fetching weather:", error);
        return 'Erro';
    }
}