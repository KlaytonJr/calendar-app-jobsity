<template>
    <div
        :class="['day', { 'current-month': dayData.isCurrentMonth, 'today': dayData.isToday }]"
        @click="$emit('day-selected', dayData)"
    >
        <span class="day-number">{{ dayData.number }}</span>

        <div class="reminders">
          <ReminderChip
            v-for="reminder in getRemindersForDay(dayData.date)"
            :key="reminder.id"
            :reminder="reminder"
            @edit-reminder="(v) => $emit('edit-reminder', v)"
          />
        </div>
    </div>
</template>

<script>
import { useRemindersStore } from '@/stores/remindersStore';
import { mapState } from 'pinia';

// Components
import ReminderChip from '../reminder/ReminderChip.vue';

export default {
  components: { ReminderChip },
  props: {
    dayData: {
      type: Object,
      required: true,
    },
  },
  emits: ['day-selected', 'edit-reminder'],
  computed: {
    ...mapState(useRemindersStore, ['reminders']),
  },
  methods: {
    sortReminders(reminders) {
      return [...reminders].sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });
    },

    getRemindersForDay(date) {
      const dailyReminders = this.reminders.filter(reminder => reminder.date === date);
      return this.sortReminders(dailyReminders);
    },
  }
};
</script>

<style scoped>
.day {
  border: 1px solid #eee;
  padding: 10px;
  width: 100%; 
  height: 100%; 
  min-height: 80px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: flex-start;
  position: relative;
  background-color: #fcfcfc;
  cursor: pointer;
  transition: background-color 0.2s ease;
  overflow-y: hidden;
}

.day:hover {
  background-color: #f0f0f0;
}

.day-number {
  flex-shrink: 0;
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.day:not(.current-month) {
  background-color: #f7f7f7;
  color: #aaa;
}

.day:not(.current-month) .day-number {
  color: #aaa;
}

.today {
  background-color: #e3f2fd;
  border: 2px solid #2196F3;
  box-sizing: border-box;
  z-index: 1;
}

.today .day-number {
  color: #1976d2;
}

.reminders {
  width: 100%;
  padding-top: 5px;
  flex-grow: 1; 
  overflow-y: auto;
  max-height: 100%; 
  min-height: 0;
}

.reminders::-webkit-scrollbar {
  width: 4px;
}

.reminders::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}
</style>