import { createStore, combineReducers} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filter'


export default () => {
  const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    }),

    // Redux Dev Tool
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};