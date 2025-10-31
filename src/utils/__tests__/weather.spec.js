import { getWeatherIcon } from '../weather';

describe('Utils: getWeatherIcon', () => {

  it('should return ☀️ for "Clear"', () => {
    expect(getWeatherIcon('Clear')).toBe('☀️');
  });

  it('should return ☁️ for "Clouds"', () => {
    expect(getWeatherIcon('Clouds')).toBe('☁️');
  });

  it('should return 🌧️ for both "Rain" and "Drizzle"', () => {
    expect(getWeatherIcon('Rain')).toBe('🌧️');
    expect(getWeatherIcon('Drizzle')).toBe('🌧️');
  });
  
  it('should return ⛈️ for "Thunderstorm"', () => {
    expect(getWeatherIcon('Thunderstorm')).toBe('⛈️');
  });

  it('should return ❄️ for "Snow"', () => {
    expect(getWeatherIcon('Snow')).toBe('❄️');
  });

  it('should return 🌫️ for visibility conditions like "Mist" and "Haze"', () => {
    expect(getWeatherIcon('Mist')).toBe('🌫️');
    expect(getWeatherIcon('Smoke')).toBe('🌫️');
    expect(getWeatherIcon('Haze')).toBe('🌫️');
  });

  it('should return ☀️ for null, "N/A", or "Erro" inputs', () => {
    expect(getWeatherIcon(null)).toBe('☀️');
    expect(getWeatherIcon('')).toBe('☀️');
    expect(getWeatherIcon('N/A')).toBe('☀️');
    expect(getWeatherIcon('Erro')).toBe('☀️');
  });

  it('should return 🌎 for an unknown weather condition (default case)', () => {
    expect(getWeatherIcon('Unmapped condition')).toBe('🌎');
  });
});