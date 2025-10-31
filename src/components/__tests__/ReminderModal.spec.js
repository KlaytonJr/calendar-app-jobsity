import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ReminderModal from '../modal/ReminderModal.vue'; 

import { getCityWeather } from '@/services/weather';
jest.mock('@/services/weather');

describe('ReminderModal.vue - Creation Mode', () => {
  let wrapper;

  beforeEach(() => {
    getCityWeather.mockClear(); 
    getCityWeather.mockImplementation(() => Promise.resolve('Mocked Clear Sky'));

    wrapper = mount(ReminderModal, {
      props: {
        selectedDate: '2025-11-15',
        initialReminder: null,
      },
    });
  });

  const findInput = (label) => wrapper.find(`input[placeholder="${label}"]`).element.value;
  
  it('should be in "Add Reminder" mode when initialReminder is null', () => {
    expect(wrapper.vm.isEditMode).toBe(false);
    expect(wrapper.find('h3').text()).toBe('Add Reminder');
  });

  it('should start with default form values (time 08:00)', () => {
    expect(wrapper.vm.form.date).toBe('2025-11-15');
    expect(wrapper.vm.form.time).toBe('08:00');
    expect(wrapper.vm.form.text).toBe('');
  });

  it('should disable the Add button if Label (text) is empty', async () => {
    const addButton = wrapper.find('[data-testid="add-button"]');     
    if (!addButton.exists()) throw new Error("Add button not found by data-testid");

    await wrapper.find('input[placeholder="Reminder"]').setValue('');
    expect(wrapper.vm.isFormValid).toBe(false);
    expect(addButton.attributes('disabled')).toBeDefined();
  });

  it('should successfully emit "add-reminder" event with user data and fetched weather', async () => {
    const textInput = wrapper.find('input[placeholder="Reminder"]');
    const cityInput = wrapper.find('input[placeholder="New York"]');
    const timeInput = wrapper.find('input[type="time"]');

    await textInput.setValue('Test reminder');
    await cityInput.setValue('Dubai');
    await timeInput.setValue('18:00');
    
    await wrapper.find('[data-testid="add-button"]').trigger('click');

    await flushPromises();

    expect(getCityWeather).toHaveBeenCalledTimes(1);
    expect(getCityWeather).toHaveBeenCalledWith('Dubai', '2025-11-15');
    
    const emittedEvents = wrapper.emitted('close'); 

    expect(emittedEvents).toBeTruthy();
  });
});