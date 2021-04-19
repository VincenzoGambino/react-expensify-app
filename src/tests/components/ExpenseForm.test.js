import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('test add expense from component', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();

});

test('test edit expense from component', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render erros', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit', {preventDefault: () => {}});
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "my description";
  wrapper.find('input').at(0).simulate('change', {target: {value}});
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on text change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "my note";
  wrapper.find('textarea').simulate('change', {target: {value}});
  expect(wrapper.state('note')).toBe(value);
});

test('should set valid amount', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "123.50";
  wrapper.find('input').at(1).simulate('change', {target: {value}});
  expect(wrapper.state('amount')).toBe(value);
});

test('should set invalid amount', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "123.501";
  wrapper.find('input').at(1).simulate('change', {target: {value}});
  expect(wrapper.state('amount')).toBe('');
});


test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {preventDefault: () => {}});
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = moment(0);
  wrapper.find('SingleDatePicker').prop('onDateChange')(value);
  expect(wrapper.state('createdAt')).toEqual(value);
});

test('should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const focused =  true;
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
  expect(wrapper.state('calendarFocused')).toEqual(focused);
});