<template>
  <div class="header">
    <button @click="$emit('navigate', -1)">
        <ArrowLeft size="32" color="white" />
    </button>
    <h2>{{ monthName }} {{ year }}</h2>
    <button @click="$emit('navigate', 1)">
        <ArrowRight size="32" color="white" />
    </button>
  </div>
</template>

<script>
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';

export default {
    components: { ArrowLeft, ArrowRight },
    props: {
        monthName: {
        type: String,
        required: true,
        },
        year: {
        type: Number,
        required: true,
        },
    },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #2196F3;
  color: white;
  border-bottom: 1px solid #ccc;
}

.header button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.header h2 {
  margin: 0;
  font-size: 1.8em;
  font-weight: normal;
}
</style>