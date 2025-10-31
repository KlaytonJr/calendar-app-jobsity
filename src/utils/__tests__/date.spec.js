import { formatDate, isSameDay } from '../date';

describe('Utils: Date Functions', () => {
  describe('formatDate', () => {
    it('should correctly format a standard date to YYYY-MM-DD', () => {
      const date = new Date(2025, 9, 15);
      const expected = '2025-10-15';

      expect(formatDate(date)).toBe(expected);
    });

    it('should correctly pad single-digit month and day with zero', () => {
      const date = new Date(2024, 2, 5);
      const expected = '2024-03-05';

      expect(formatDate(date)).toBe(expected);
    });
    
    it('should handle end-of-year dates (December 31st) correctly', () => {
      const date = new Date(2026, 11, 31); 
      const expected = '2026-12-31';

      expect(formatDate(date)).toBe(expected);
    });
  });

  describe('isSameDay', () => {
    const dateA = new Date(2025, 0, 10, 10, 30, 0);
    const dateB = new Date(2025, 0, 10, 23, 59, 59);

    it('should return true for two dates representing the same calendar day (ignoring time)', () => {
      expect(isSameDay(dateA, dateB)).toBe(true);
    });

    it('should return false for different days in the same month and year', () => {
      const differentDay = new Date(2025, 0, 11, 12, 0, 0);
      expect(isSameDay(dateA, differentDay)).toBe(false);
    });

    it('should return false for the same day number in different months', () => {
      const differentMonth = new Date(2025, 1, 10, 10, 30, 0);
      expect(isSameDay(dateA, differentMonth)).toBe(false);
    });

    it('should return false for the same day and month in different years', () => {
      const differentYear = new Date(2026, 0, 10, 10, 30, 0);
      expect(isSameDay(dateA, differentYear)).toBe(false);
    });
  });
});