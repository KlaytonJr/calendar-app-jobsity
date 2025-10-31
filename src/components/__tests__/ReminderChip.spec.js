import { mount } from '@vue/test-utils';
import ReminderChip from '../reminder/ReminderChip.vue';

jest.mock('@/utils/colors');
jest.mock('@/utils/weather');

import { hexToRgba } from '@/utils/colors';
import { getWeatherIcon } from '@/utils/weather';

describe('ReminderChip.vue', () => {
  let wrapper;
  const mockReminder = {
    id: 101,
    text: 'Client Demo',
    time: '14:00',
    city: 'Curitiba',
    color: '#3498db',
    weather: 'Rain'
  };

  beforeEach(() => {
    hexToRgba.mockClear();
    getWeatherIcon.mockClear();

    wrapper = mount(ReminderChip, {
      props: {
        reminder: mockReminder
      }
    });
  });

  it('should render the reminder text and time correctly', () => {
    expect(wrapper.find('.reminder-text').text()).toContain(mockReminder.text);
    expect(wrapper.find('.reminder-time').text()).toBe(mockReminder.time);
  });
  
  it('should call hexToRgba twice to set background and border colors', () => {
    expect(hexToRgba).toHaveBeenCalledWith(mockReminder.color, 0.2);
    expect(hexToRgba).toHaveBeenCalledWith(mockReminder.color, 0.5);
    expect(hexToRgba).toHaveBeenCalledTimes(2);
  });

  it('should apply the correct color and mocked RGBA styles', () => {
    const chip = wrapper.find('.reminder-chip');

    const expectedRgbColor = 'rgb(52, 152, 219)';
    
    expect(chip.attributes('style')).toContain(`color: ${expectedRgbColor};`);
  });
  
  it('should call getWeatherIcon with the reminder weather status', () => {
    expect(getWeatherIcon).toHaveBeenCalledWith(mockReminder.weather);
  });

  it('should display the mocked weather icon', () => {
    const iconElement = wrapper.find('.weather-icon');
    
    expect(iconElement.text()).toBe('[RAIN_ICON]');
  });

  it('should emit the "edit-reminder" event when clicked', async () => {
    await wrapper.find('.reminder-chip').trigger('click');

    expect(wrapper.emitted('edit-reminder')).toBeTruthy();
    
    expect(wrapper.emitted('edit-reminder')[0][0]).toEqual(mockReminder);
  });
});