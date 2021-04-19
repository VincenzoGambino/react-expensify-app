import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action', () => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action', () => {
  const id = {id: '123abc'}
  const updates = {description: 'This is my description', amount: '1234'};
  const action = editExpense(id, updates);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  })
});

test('should setup add expense action with added value', () => {
  const expenseData = {
    description: 'Rent',
    amount: 10950,
    createdAt: 1000,
    note: 'This is my note'
  }
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup add expense action with default value', () => {
  const defaultValue = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  } ;
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...defaultValue,
      id: expect.any(String)
    }
  });

});