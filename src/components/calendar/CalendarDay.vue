<template>
    <div
        :class="['day', { 'current-month': dayData.isCurrentMonth, 'today': dayData.isToday }]"
        @click="() => {}"
    >
        <span class="day-number">{{ dayData.number }}</span>
    </div>
</template>

<script>
export default {
  props: {
    dayData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.day {
  border: 1px solid #eee;
  padding: 10px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  background-color: #fcfcfc;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.day:hover {
  background-color: #f0f0f0;
}

.day-number {
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
</style>