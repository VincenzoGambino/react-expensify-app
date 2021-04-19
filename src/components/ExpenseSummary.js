import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expenseTotal from '../selectors/expense-total';
import numeral from 'numeral';


export const ExpenseSummary = (props) => {
  const wording = props.expenseCount === 1 ? 'expense' : 'expenses';
  return (
    <div>
    <h1>Viewing {props.expenseCount} {wording} totalling {numeral(props.expenseTotal / 100).format('$0,00.00')}</h1>
     </div>
  );
};

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseTotal: expenseTotal(expenses),
    expenseCount: expenses.length
  }
};

export default connect(mapStateToProps)(ExpenseSummary);
