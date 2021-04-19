import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

const store = configureStore();

store.dispatch(addExpense({description: 'Water Bill', amount: 4000, createdAt: moment().subtract(4, 'days').valueOf()}));
store.dispatch(addExpense({description: 'Gas Bill', amount: 20000, createdAt: moment().add(4, 'days').valueOf()}));
store.dispatch(addExpense({description: 'Rent', amount: 1090, createdAt: moment().valueOf()}));

const state = store.getState();
const visibleExpense = getVisibleExpenses(state.expenses, state.filters);
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));