<template>
    <div class="calendar">
        <CalendarHeader
            :monthName="currentMonthName"
            :year="currentYear"
        />
        <CalendarWeekdays />
    </div>
</template>

<script>
import CalendarHeader from './CalendarHeader.vue';
import CalendarWeekdays from './CalendarWeekdays.vue';

export default {
  components: {
    CalendarHeader,
    CalendarWeekdays,
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
</style>