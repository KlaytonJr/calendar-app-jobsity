import { mount } from '@vue/test-utils';
import VCalendar from '../calendar/VCalendar.vue';

const MOCK_DATE = new Date(2025, 9, 15);
const originalDateNow = Date.now;

describe('VCalendar.vue - State and Navigation Logic', () => {
  let wrapper;

  beforeEach(() => {
    global.Date.now = jest.fn(() => MOCK_DATE.getTime());

    wrapper = mount(VCalendar, {
      global: {
        stubs: {
          CalendarHeader: true,
          CalendarWeekdays: true,
          CalendarDay: true,
          ReminderModal: true,
        },
      },
    });
  });

  afterAll(() => {
      global.Date.now = originalDateNow;
  });

  it('should correctly calculate and display the current month and year', () => {
    expect(wrapper.vm.currentMonthName).toBe('October'); 
    expect(wrapper.vm.currentYear).toBe(2025);
  });
  
  it('should generate 42 days (6 weeks) for the displayedDays grid', () => {
    expect(wrapper.vm.displayedDays.length).toBe(42);
  });

  it('should navigate to the previous month when handleMonthNavigation(-1) is called', () => {
    wrapper.vm.handleMonthNavigation(-1); 
    
    expect(wrapper.vm.currentMonthName).toBe('October'); 
    expect(wrapper.vm.currentYear).toBe(2025); 
  });
  
  it('should navigate to the next month when handleMonthNavigation(1) is called', () => {
    wrapper.vm.handleMonthNavigation(1); 
    
    expect(wrapper.vm.currentMonthName).toBe('December'); 
    expect(wrapper.vm.currentYear).toBe(2025);
  });

  it('should open the modal when selectDay is called with a day from the current month', () => {
    const mockDay = { date: '2025-10-15', isCurrentMonth: true };
    
    wrapper.vm.selectDay(mockDay);
    
    expect(wrapper.vm.showModal).toBe(true); 
    expect(wrapper.vm.selectedDayDate).toBe('2025-10-15');
    expect(wrapper.vm.editingReminder).toBe(null);
  });
  
  it('should NOT open the modal when selectDay is called with a day from an adjacent month', () => {
    const mockDay = { date: '2025-09-30', isCurrentMonth: false }; 
    
    wrapper.vm.selectDay(mockDay);
    
    expect(wrapper.vm.showModal).toBe(false); 
  });
  
  it('should open the modal in EDIT mode when openEditModal is called', () => {
    const mockReminder = { id: 1, text: 'Edit Me' };
    
    wrapper.vm.openEditModal(mockReminder);
    
    expect(wrapper.vm.showModal).toBe(true); 
    expect(wrapper.vm.editingReminder).toEqual(mockReminder); 
    expect(wrapper.vm.selectedDayDate).toBe(null);
  });

  it('should close the modal and reset states when closeModal is called', () => {
    wrapper.vm.showModal = true;
    wrapper.vm.editingReminder = { id: 1 };
    wrapper.vm.selectedDayDate = '2025-11-01';

    wrapper.vm.closeModal();

    expect(wrapper.vm.showModal).toBe(false);
    expect(wrapper.vm.editingReminder).toBe(null);
    expect(wrapper.vm.selectedDayDate).toBe(null);
  });
});