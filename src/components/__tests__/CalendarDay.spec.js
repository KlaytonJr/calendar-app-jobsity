import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import CalendarDay from '../calendar/CalendarDay.vue';

const MOCK_REMINDERS = [
  { id: 1, date: '2025-10-15', time: '14:00', text: 'Meeting', color: '#0000ff' },
  { id: 2, date: '2025-10-15', time: '10:00', text: 'Appointment', color: '#ff0000' },
  { id: 3, date: '2025-10-16', time: '11:00', text: 'Other Day', color: '#00ff00' },
];

describe('CalendarDay.vue', () => {
  const defaultDayData = {
    date: '2025-10-15',
    number: 15,
    isCurrentMonth: true,
    isToday: false,
  };

  const mountComponent = (customDayData = {}, reminders = MOCK_REMINDERS) => {
    return mount(CalendarDay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              reminders: {
                reminders: reminders,
              },
            },
          }),
        ],
        stubs: {
          ReminderChip: {
            props: ['reminder'],
            template: '<div class="mock-chip" @click="$emit(\'edit-reminder\', reminder)">{{ reminder.text }}</div>',
          }
        },
      },
      props: {
        dayData: { ...defaultDayData, ...customDayData },
      },
    });
  };

  it('should render the correct day number', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.day-number').text()).toBe('15');
  });

  it('should apply the "current-month" class for days of the current month', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('current-month');
    expect(wrapper.classes()).not.toContain('day:not(.current-month)');
  });
  
  it('should apply the "today" class when isToday is true', () => {
    const wrapper = mountComponent({ isToday: true });
    expect(wrapper.classes()).toContain('today');
  });
  
  it('should correctly filter and display only reminders for the current day', () => {
    const wrapper = mountComponent();
    const chips = wrapper.findAll('.mock-chip');

    expect(chips.length).toBe(2);
    expect(chips.map(c => c.text())).toEqual(['Appointment', 'Meeting']);
  });

  it('should display reminders sorted by time (earliest first)', () => {
    const wrapper = mountComponent();
    const chips = wrapper.findAll('.mock-chip');

    expect(chips[0].text()).toBe('Appointment');
    expect(chips[1].text()).toBe('Meeting');
  });
  
  it('should not display any reminders if the reminders array is empty', () => {
    const wrapper = mountComponent({}, []); 
    expect(wrapper.findAll('.mock-chip').length).toBe(0);
  });
    
  it('should emit "day-selected" when the day div is clicked', async () => {
    const wrapper = mountComponent();
    await wrapper.find('.day').trigger('click');

    expect(wrapper.emitted('day-selected')).toBeTruthy();
    expect(wrapper.emitted('day-selected')[0][0]).toEqual(defaultDayData);
  });

  it('should emit "edit-reminder" when a ReminderChip is clicked', async () => {
    const wrapper = mountComponent();
    const targetReminder = MOCK_REMINDERS[1]; 
    
    const chip = wrapper.findAll('.mock-chip')[0]; 
    await chip.trigger('click');

    expect(wrapper.emitted('edit-reminder')).toBeTruthy();
    
    expect(wrapper.emitted('edit-reminder')[0][0]).toEqual(targetReminder);
  });
});