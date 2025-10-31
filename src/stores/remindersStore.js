import { defineStore } from 'pinia';

export const useRemindersStore = defineStore('reminders', {
  state: () => ({
    reminders: [],
  }),
  
  actions: {
    addReminder(newReminder) {
      const text = String(newReminder.text || '');
      newReminder.id = Date.now();
      newReminder.text = text.substring(0, 30);
      this.reminders.push(newReminder);
    },

    updateReminder(updatedReminder) {
      const index = this.reminders.findIndex(r => r.id === updatedReminder.id);
      if (index !== -1) {
        updatedReminder.text = updatedReminder.text.substring(0, 30);
        this.reminders.splice(index, 1, updatedReminder);
      }
    },

    deleteReminder(id) {
      this.reminders = this.reminders.filter(r => r.id !== id);
    },
  },

  persist: {
    storage: localStorage,
    key: 'calendar-reminders-data',
  },
});