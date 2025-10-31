import { mount } from '@vue/test-utils';
import CalendarWeekdays from '../calendar/CalendarWeekdays.vue';

describe('CalendarWeekdays.vue', () => {
  it('should render exactly 7 weekday names in the correct order', () => {
    const expectedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const wrapper = mount(CalendarWeekdays);
    
    const weekdayElements = wrapper.findAll('.weekday');
    expect(weekdayElements.length).toBe(7);

    weekdayElements.forEach((dayElement, index) => {
      expect(dayElement.text()).toBe(expectedDays[index]);
    });
  });

  it('should render the main container with the class "weekdays"', () => {
    const wrapper = mount(CalendarWeekdays);
    expect(wrapper.find('.weekdays').exists()).toBe(true);
  });
});