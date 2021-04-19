import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashbboardPage from '../../components/ExpenseDashboardPage';

test('should render EspenseDashBoardPage component', () => {
  const wrapper = shallow(<ExpenseDashbboardPage />);
  expect(wrapper).toMatchSnapshot();
});