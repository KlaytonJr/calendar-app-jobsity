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

describe('Reminders Store - Update and Delete', () => {
  let store;
  const initialReminder = { 
    id: MOCK_TIME + 1,
    date: '2025-12-01', 
    time: '09:00', 
    city: 'London', 
    text: 'Original Plan', 
    color: '#ff0000', 
    weather: 'Rain' 
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useRemindersStore();
    store.reminders.push(initialReminder);
  });

  it('should successfully update an existing reminder', () => {
    const updatedText = 'New Project Details';
    const updatedTime = '16:00';
    const updatedCity = 'Manchester';

    const updatedReminder = {
      ...initialReminder,
      text: updatedText,
      time: updatedTime,
      city: updatedCity,
    };

    store.updateReminder(updatedReminder);

    expect(store.reminders.length).toBe(1);
    expect(store.reminders[0].text).toBe(updatedText);
    expect(store.reminders[0].time).toBe(updatedTime);
    expect(store.reminders[0].city).toBe(updatedCity);
    expect(store.reminders[0].id).toBe(initialReminder.id);
  });

  it('should trim the updated text to a maximum of 30 characters', () => {
    const longText = 'This new update text exceeds the max character limit.';
    const expectedText = 'This new update text exceeds t';

    const updatedReminder = {
      ...initialReminder,
      text: longText,
    };

    store.updateReminder(updatedReminder);

    expect(store.reminders[0].text.length).toBe(30);
    expect(store.reminders[0].text).toBe(expectedText);
  });

  it('should not update if the reminder ID is not found', () => {
    const nonExistentId = 9999;
    const originalText = store.reminders[0].text;
    
    store.updateReminder({ id: nonExistentId, text: 'Attempted Change' });

    expect(store.reminders.length).toBe(1);
    expect(store.reminders[0].text).toBe(originalText);
  });

  it('should successfully delete an existing reminder by ID', () => {
    expect(store.reminders.length).toBe(1);
    
    store.deleteReminder(initialReminder.id);

    expect(store.reminders.length).toBe(0);
  });

  it('should do nothing if the ID to delete is not found', () => {
    expect(store.reminders.length).toBe(1);

    store.deleteReminder(9999);

    expect(store.reminders.length).toBe(1); 
    expect(store.reminders[0].id).toBe(initialReminder.id);
  });
});