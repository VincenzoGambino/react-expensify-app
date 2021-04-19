import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, history, wrapper, removeExpense;

beforeEach (() => {
  editExpense = jest.fn();
  history = {push: jest.fn()};
  removeExpense = jest.fn();
  wrapper = shallow(<EditExpensePage expense={expenses[1]} editExpense={editExpense} history={history} removeExpense={removeExpense}/>);
});

test('should render edit expense page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle remove Expenses', () => {
  wrapper.find('button').simulate('click', {id: expenses[1].id});
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[1].id});
});