<template>
    <div class="calendar">
        <CalendarHeader
            :monthName="currentMonthName"
            :year="currentYear"
        />
        <CalendarWeekdays />

        <div class="days-grid">
            <CalendarDay
                v-for="day in displayedDays"
                :key="day.date"
                :dayData="day"
            />
        </div>
    </div>
</template>

<script>
import { formatDate, isSameDay } from '@/utils/date';

// Components
import CalendarHeader from './CalendarHeader.vue';
import CalendarWeekdays from './CalendarWeekdays.vue';
import CalendarDay from './CalendarDay.vue';

export default {
  components: {
    CalendarHeader,
    CalendarWeekdays,
    CalendarDay,
  },
  data() {
    return {
        currentDate: new Date(),
    };
  },
  computed: {
    currentMonthName() {
      return this.currentDate.toLocaleString('default', { month: 'long' });
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    displayedDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();

      const startDayOfWeek = firstDayOfMonth.getDay();

      const days = [];

      // Days from previous month
      for (let i = startDayOfWeek; i > 0; i--) {
        const prevMonthDay = new Date(year, month, 1 - i);
        days.push({
          date: formatDate(prevMonthDay),
          number: prevMonthDay.getDate(),
          isCurrentMonth: false,
        });
      }

      // Days of current month
      for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(year, month, i);
        days.push({
          date: formatDate(dayDate),
          number: i,
          isCurrentMonth: true,
          isToday: isSameDay(dayDate, new Date()),
        });
      }

      // Days from next month to fill the grid
      const totalCells = 42; // 6 rows * 7 days
      let remainingCells = totalCells - days.length;
      if (remainingCells < 0) remainingCells = remainingCells + 7;

      for (let i = 1; i <= remainingCells; i++) {
        const nextMonthDay = new Date(year, month + 1, i);
        days.push({
          date: formatDate(nextMonthDay),
          number: nextMonthDay.getDate(),
          isCurrentMonth: false,
        });
      }

      return days;
    },
  },
  methods: {},
};
</script>

<style scoped>
.calendar {
  max-width: 900px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
</style>