import React from 'react'
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

import expenses from '../fixtures/expenses';

test('check with 0 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={0} expenseTotal={0}/>);
  expect(wrapper).toMatchSnapshot();
});

test('check with 1 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={123}/>);
  expect(wrapper).toMatchSnapshot();
});

test('check with 1 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={23} expenseTotal={23400}/>);
  expect(wrapper).toMatchSnapshot();
});