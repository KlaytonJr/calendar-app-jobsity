import { setActivePinia, createPinia } from 'pinia';
import { useRemindersStore } from '../remindersStore';

const MOCK_TIME = 1678886400000;
global.Date.now = jest.fn(() => MOCK_TIME);

describe('Reminders Store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useRemindersStore();
  });

  const baseReminder = {
    date: '2025-11-15',
    time: '14:30',
    city: 'Paris',
    color: '#000000',
    weather: 'Clear',
  };

  it('should initialize with an empty array of reminders', () => {
    expect(store.reminders).toEqual([]);
  });

  it('should successfully add a new reminder with all required fields', () => {
    const newReminder = { ...baseReminder, text: 'Meeting with the client' };

    store.addReminder(newReminder);

    expect(store.reminders.length).toBe(1);
    expect(store.reminders[0]).toEqual({
      ...newReminder,
      id: MOCK_TIME, 
      text: 'Meeting with the client',
    });
  });

  it('should trim the reminder text to a maximum of 30 characters', () => {
    const longText = 'This is a very long reminder that exceeds the thirty character limit.';
    const expectedText = 'This is a very long reminder t';

    const newReminder = { ...baseReminder, text: longText };

    store.addReminder(newReminder);

    expect(store.reminders.length).toBe(1);
    expect(store.reminders[0].text.length).toBe(30);
    expect(store.reminders[0].text).toBe(expectedText);
  });

  it('should save the user entered city and time correctly', () => {
    const city = 'Campina Grande';
    const time = '21:45';

    const newReminder = { ...baseReminder, city: city, time: time, text: 'Test' };

    store.addReminder(newReminder);

    expect(store.reminders[0].city).toBe(city);
    expect(store.reminders[0].time).toBe(time);
  });
});