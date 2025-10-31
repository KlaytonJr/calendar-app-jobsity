import { hexToRgba } from '../colors';

describe('Utils: hexToRgba', () => {

  it('should convert a 6-digit HEX code to RGBA with specified alpha', () => {
    const hex = '#ff00aa';
    const alpha = 0.5;
    const expected = 'rgba(255, 0, 170, 0.5)';
    
    expect(hexToRgba(hex, alpha)).toBe(expected);
  });

  it('should convert a 3-digit shorthand HEX code to RGBA with specified alpha', () => {
    const hex = '#1C8';
    const alpha = 0.25;

    const expected = 'rgba(17, 204, 136, 0.25)';
    
    expect(hexToRgba(hex, alpha)).toBe(expected);
  });

  it('should handle black (#000000) and white (#FFFFFF) correctly', () => {
    const black = '#000';
    const white = '#FFFFFF';
    const alpha = 1.0;

    expect(hexToRgba(black, alpha)).toBe('rgba(0, 0, 0, 1)');
    expect(hexToRgba(white, alpha)).toBe('rgba(255, 255, 255, 1)');
  });
  
  it('should return transparent RGBA for invalid HEX lengths', () => {
    const invalid5 = '#12345';
    const invalid8 = '#12345678';
    const noHash = '123456';
    const alpha = 0.7;

    const expectedTransparent = 'rgba(0, 0, 0, 0)';
    
    expect(hexToRgba(invalid5, alpha)).toBe(expectedTransparent);
    expect(hexToRgba(invalid8, alpha)).toBe(expectedTransparent);
    expect(hexToRgba(noHash, alpha)).toBe(expectedTransparent);
    expect(hexToRgba('', alpha)).toBe(expectedTransparent);
  });

  it('should handle alpha values of 0 and 1 correctly', () => {
    const hex = '#abc';
    
    expect(hexToRgba(hex, 0)).toBe('rgba(170, 187, 204, 0)');
    expect(hexToRgba(hex, 1)).toBe('rgba(170, 187, 204, 1)');
  });
});