export function getWeatherIcon(weather) {
    if (!weather || weather === 'N/A' || weather === 'Erro') return '☀️';

    const weatherMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌧️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '🌫️',
        'Haze': '🌫️',
        'Dust': '💨',
        'Fog': '🌁',
        'Sand': '💨',
        'Ash': '🌋',
        'Squall': '💨',
        'Tornado': '🌪️',
    };
    
    return weatherMap[weather] || '🌎';
}