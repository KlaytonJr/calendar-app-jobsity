import { getCityWeather } from '../weather'; 
import fetch from 'jest-fetch-mock'; 

fetch.enableMocks();

const MOCK_LAT = 34.05;
const MOCK_LON = -118.24;
const MOCK_CITY = 'Los Angeles';
const MOCK_DATE = '2025-11-05T12:00:00';
const TARGET_DATE = '2025-11-05';

const mockGeoData = [{ lat: MOCK_LAT, lon: MOCK_LON }];

const mockForecastData = {
  list: [
    { dt_txt: '2025-11-04 12:00:00', weather: [{ main: 'Clouds' }] },
    
    { dt_txt: '2025-11-05 06:00:00', weather: [{ main: 'Clear' }] },
    
    { dt_txt: '2025-11-05 15:00:00', weather: [{ main: 'Rain' }] },
  ],
};

describe('Weather Service: getCityWeather', () => {
  beforeEach(() => {
    fetch.resetMocks(); 
  });

  it('should return N/A if city or date is missing', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    let result = await getCityWeather('New York', null);
    expect(result).toBe('N/A');

    result = await getCityWeather(null, '2025-11-05');
    expect(result).toBe('N/A');
    
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore(); 
  });

  it('should successfully call API, filter data, and return the correct weather', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockGeoData));

    fetch.mockResponseOnce(JSON.stringify(mockForecastData));

    const weather = await getCityWeather(MOCK_CITY, MOCK_DATE);

    expect(fetch).toHaveBeenCalledTimes(2); 
    
    expect(fetch.mock.calls[0][0]).toContain(`q=${MOCK_CITY}`);
    
    expect(fetch.mock.calls[1][0]).toContain(`lat=${MOCK_LAT}`); 
    
    expect(weather).toBe('Clear');
  });

  it('should return N/A if the city is not found by GeoCoding API', async () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    fetch.mockResponseOnce(JSON.stringify([]));

    const weather = await getCityWeather(MOCK_CITY, MOCK_DATE);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(weather).toBe('N/A');
    expect(consoleWarnSpy).toHaveBeenCalledWith(`City not found: ${MOCK_CITY}`);
    consoleWarnSpy.mockRestore();
  });

  it('should return N/A if forecast data is available but the target date is not found', async () => {
    const forecastWithoutTarget = {
        list: [
            { dt_txt: '2025-12-01 12:00:00', weather: [{ main: 'Clouds' }] }
        ]
    };

    fetch.mockResponseOnce(JSON.stringify(mockGeoData));

    fetch.mockResponseOnce(JSON.stringify(forecastWithoutTarget));

    const weather = await getCityWeather(MOCK_CITY, '2025-11-05'); 

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(weather).toBe('N/A');
  });

  it('should return "Erro" if the fetch call fails (network error)', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    fetch.mockReject(new Error('Simulated network error')); 

    const weather = await getCityWeather(MOCK_CITY, MOCK_DATE);

    expect(weather).toBe('Erro');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});