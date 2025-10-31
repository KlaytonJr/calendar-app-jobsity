<template>
  <div
    class="reminder-chip"
    :style="{ 
        color: reminder.color, 
        backgroundColor: hexToRgba(reminder.color, 0.2), 
        borderColor: hexToRgba(reminder.color, 0.5) 
    }"
    @click.stop="$emit('edit-reminder', reminder)"
  >
    <span class="reminder-text">
        <span class="weather-icon">{{ getWeatherIcon(reminder.weather) }}</span>
        {{ reminder.text }}
    </span>
    <span class="reminder-time">{{ reminder.time }}</span>
  </div>
</template>

<script>
import { hexToRgba } from '@/utils/colors'
import { getWeatherIcon } from '@/utils/weather'

export default {
  name: 'ReminderChip',
  props: {
    reminder: {
      type: Object,
      required: true,
    }
  },
  emits: ['edit-reminder'],
  methods: {
    hexToRgba,
    getWeatherIcon
  }
};
</script>

<style scoped>
.reminder-chip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2px 4px;
  margin-bottom: 3px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
}

.reminder-text {
    text-align: start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 1; 
    padding-right: 5px;
}

.reminder-time {
    flex-shrink: 0; 
    font-weight: 600;
}

.weather-icon {
    margin-right: 4px;
}
</style>