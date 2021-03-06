import expenseTotal from '../../selectors/expense-total';
import expenses from '../fixtures/expenses';


test('should return 0 if no exdpenses', () =>{
  const result = expenseTotal([]);
  expect(result).toBe(0);
});

test('should correctly add up a single expense', () =>{
  const result = expenseTotal([expenses[0]]);
  expect(result).toBe(195);
});

test('should correctly add up multiple expenses', () =>{
  const result = expenseTotal(expenses);
  expect(result).toBe(114195);
});