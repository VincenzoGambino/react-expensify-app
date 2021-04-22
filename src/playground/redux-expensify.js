import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';


const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

const expensesReducerDefault = [];
const expensesReducer = (state = expensesReducerDefault, action) => {
    switch (action.type) {
      case 'ADD_EXPENSE':
        return [
          ...state,
          action.expense
        ];
      case 'REMOVE_EXPENSE':
        return state.filter(({id}) => id !== action.id);
      case 'EDIT_EXPENSE':
        return state.map((expense) => {
          if (expense.id === action.id) {
            return {
              ...expense,
              ...action.updates
            }
          } else {
            return expense;
          }
        });
        default:
            return state;
    }
};

const filtersReducerDefault = 
  {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };

const setTextfilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({
  type: 'SORT_BY',
  sortBy: 'amount'
});

const sortByDate = () => ({
  type: 'SORT_BY',
  sortBy: 'date'
});

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
const filtersReducer = ((state = filtersReducerDefault, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
        return state;
  }
});

const getExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    else if (sortBy == 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

const store = createStore(
  combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const Expense = getExpenses(state.expenses, state.filters);
  console.log(Expense);
});


const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -11000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 2000, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

//store.dispatch(setTextfilter('rent'));
// store.dispatch(setTextfilter());

 store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(-1250));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 123,
        description: 'January Rent',
        note: 'Final rent',
        amount: 54000,
        createtAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};