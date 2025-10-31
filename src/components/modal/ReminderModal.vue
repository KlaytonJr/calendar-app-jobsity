<template>
  <div class="reminder-modal-overlay" @click.self="$emit('close')">
    <div class="reminder-modal-content styled-modal">
      
      <h3 class="modal-title">{{ isEditMode ? 'Edit Reminder' : 'Add Reminder' }}</h3>
      
      <div class="input-group full-width">
        <label>Label</label>
        <input v-model="form.text" placeholder="Reminder" maxlength="30" />
      </div>

      <div class="two-columns">
        <div class="input-group">
          <label>Date</label>
          <input type="date" v-model="form.date" :readonly="!isEditMode" />
        </div>

        <div class="input-group">
          <label>Hour</label>
          <input type="time" v-model="form.time" required />
        </div>

        <div class="input-group">
          <label>City</label>
          <input v-model="form.city" placeholder="New York" />
        </div>

        <div class="input-group">
          <label>Color</label>
          <input type="color" v-model="form.color" class="color-picker" />
        </div>
      </div>

      <div class="modal-footer">
        
        <button v-if="isEditMode" @click="() => {}" class="button-base button-delete">Delete</button>

        <button @click="$emit('close')" class="button-base button-cancel">Cancel</button>
        
        <button 
          @click="() => {}" 
          :disabled="!isFormValid" 
          class="button-base button-save"
        >
          {{ isEditMode ? 'Save Edits' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedDate: {
      type: String,
      default: null,
    },
    initialReminder: {
      type: Object,
      default: null, 
    },
  },
  emits: ['close'],
  data() {
    return {
      form: {
        id: null,
        date: this.selectedDate || '',
        text: '',
        time: '08:00',
        city: '',
        color: '#ADD8E6',
      },
    };
  },
  computed: {
    isEditMode() {
      return !!this.initialReminder;
    },
    isFormValid() {
      return String(this.form.text || '').trim().length > 0;
    },
  },
  watch: {
    initialReminder: {
        immediate: true,
        handler(newReminder) {
            if (newReminder) {
                // Edition mode
                this.form = { ...newReminder };
            } else {
                // Criation mode
                this.form = {
                    id: null,
                    date: this.selectedDate,
                    text: '',
                    time: '08:00',
                    city: '',
                    color: '#ADD8E6',
                };
            }
        },
    }
  },
  methods: {
  },
};
</script>

<style scoped>
.reminder-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.reminder-modal-content {
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 450px; 
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-title {
    font-size: 1.8em;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: left;
    color: #333;
}

.two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.input-group label {
    font-size: 0.9em;
    font-weight: 500;
    color: #555;
    text-align: left;
}

.reminder-modal-content input:not(.color-picker) {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1em;
    box-sizing: border-box;
}

.color-picker {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0;
    cursor: pointer;
    width: 100%;
    overflow: hidden;
}

.color-picker::-webkit-color-swatch-wrapper {
    padding: 0;
}
.color-picker::-webkit-color-swatch {
    border: none;
}

.modal-footer {
    display: flex;
    justify-content: flex-end; 
    margin-top: 25px;
    gap: 10px;
}

.button-base {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.2s;
    min-width: 90px;
    color: white; 
    font-weight: 600; 
}

.button-cancel {
    background-color: #c9c9c9;
}

.button-cancel:hover {
    background-color: #b0b0b0;
}

.button-save {
    background-color: #4a90e2;
}

.button-save:hover {
    background-color: #3a7bd5;
}

.button-save:disabled {
    background-color: #a0c4f7;
    cursor: not-allowed;
}

.button-delete {
    background-color: #f44336;
}

.button-delete:hover {
    background-color: #da190b;
}
</style>