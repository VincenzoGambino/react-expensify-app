import filterReducer from '../../reducers/filter';
import moment from 'moment';

test('should setup default filters value', () => {
  const state = filterReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should sortBy amount', () => {
  const state = filterReducer(undefined, {type: 'SORT_BY', sortBy: 'amount'});
  expect(state.sortBy).toBe('amount');
});

test('should sortBy date', () => {
  const state = filterReducer(undefined, {type: 'SORT_BY', sortBy: 'date'});
  expect(state.sortBy).toBe('date');
});

test('should sortBy date default', () => {
  const state = filterReducer(undefined, {type: 'SORT_BY'});
  expect(state.sortBy).toBe('date');
});

test('should set Text Filter', () => {
  const state = filterReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'this is my text'});
  expect(state.text).toBe('this is my text');
});

test('should set start date', () => {
  const startDate = moment();
  const state = filterReducer(undefined, {type: 'SET_START_DATE', startDate});
  expect(state.startDate).toBe(startDate);
});

test('should set end date', () => {
  const endDate = moment();
  const state = filterReducer(undefined, {type: 'SET_END_DATE', endDate});
  expect(state.endDate).toBe(endDate);
});