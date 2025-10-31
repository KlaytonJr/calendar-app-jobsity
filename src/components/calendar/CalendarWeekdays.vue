<template>
    <div class="weekdays">
        <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        };
    },
};
</script>

<style scoped>
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #e0e0e0;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.weekday {
  text-align: center;
  padding: 10px 0;
  font-size: 0.9em;
  color: #555;
}
</style>