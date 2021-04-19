import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { DateRangePicker } from 'react-dates';
import { filters, AltFilters} from '../fixtures/filters';
import moment from 'moment';


let setTextFilter, setSortBy, setStartDate, setEndDate, wrapper;

beforeEach (() => {
  setTextFilter = jest.fn();
  setSortBy = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(<ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      setSortBy={setSortBy}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />);
});

test('should render expense list filter correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render expense list filter with altFilter correctly', () => {
  wrapper.setProps({
    filters: AltFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  let value = 'test';
  wrapper.find('input').at(0).simulate('change', {target: {value}});
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by amount', () => {
  let value = 'amount';
  wrapper.find('select').at(0).simulate('change', {target: {value}});
  expect(setSortBy).toHaveBeenLastCalledWith(value);
});

test('should sort by amount', () => {
  let value = 'amount';
  wrapper.find('select').at(0).simulate('change', {target: {value}});
  expect(setSortBy).toHaveBeenLastCalledWith(value);
});

test('should handle date change', () => {
  const startDate = moment(0).add(4, 'days');
  const endDate = moment(0).subtract(4, 'days');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// should handle date changes
// should handle date focus changes

test('should handle date focus change', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});