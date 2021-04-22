import { toMomentObject } from 'react-dates';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should test default state', () => {
  const state = expensesReducer(undefined, '@@INIT');
  expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]])

});


test('should not remove expense if ID not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);

});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Gym',
    note: '',
    amount: 1950,
    createdAt: 0
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense
  }

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([...expenses, expense]);

});

test('should edit an expense', () => {
  const updates = {
    description: 'Gym',
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates
  }

  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe('Gym');
});

test('should edit an expense', () => {
  const updates = {
    description: 'Gym',
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {

  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});