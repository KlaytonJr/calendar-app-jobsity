import { mount } from '@vue/test-utils';
import CalendarHeader from '../calendar/CalendarHeader.vue';

describe('CalendarHeader.vue', () => {
    
  it('should render the month name and year props correctly', () => {
    const wrapper = mount(CalendarHeader, {
      global: {
        stubs: {
          ArrowLeft: true,
          ArrowRight: true,
        },
      },
      props: {
        monthName: 'November',
        year: 2025,
      },
    });
    
    expect(wrapper.find('h2').text()).toBe('November 2025');
  });

  it('should emit the correct "navigate" event when buttons are clicked', async () => {
    const wrapper = mount(CalendarHeader, {
      global: {
        stubs: {
          ArrowLeft: true,
          ArrowRight: true,
        },
      },
      props: { 
        monthName: 'October', 
        year: 2025 
      }
    });

    const prevButton = wrapper.findAll('button')[0];
    const nextButton = wrapper.findAll('button')[1];

    await prevButton.trigger('click');
    
    await nextButton.trigger('click');

    expect(wrapper.emitted('navigate')).toBeTruthy();
    expect(wrapper.emitted('navigate').length).toBe(2);

    expect(wrapper.emitted('navigate')[0]).toEqual([-1]);
    expect(wrapper.emitted('navigate')[1]).toEqual([1]);
  });
});