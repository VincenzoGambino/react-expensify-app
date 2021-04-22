import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpenses, startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({id, description, amount, note, createdAt}) => {
    expensesData[id] = {description, amount, note, createdAt}
  });
  database.ref('expenses').set(expensesData).then(() => done())
});

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
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});


test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This is better',
    createdAt: 1000
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  })
});

test('should add expense to database and store with default', (done) => {
  const store = createMockStore({});
  const expenseDefaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaultData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaultData)
    done();
  })
});

test('should set up set expenses action with data', () => {
  const actions = setExpenses(expenses);
  expect(actions).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should delete expenses from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store.dispatch(startRemoveExpenses({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/%{id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should edit expense in firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  const updates = {description: 'This is my description', amount: '1234'};
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${actions[0].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(
      {
        description: updates.description,
        amount: updates.amount,
        note: snapshot.child('note').val(),
        createdAt: snapshot.child('createdAt').val()

      }
    );
    done();
  });
});
