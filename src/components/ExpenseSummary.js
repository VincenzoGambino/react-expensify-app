import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expenseTotal from '../selectors/expense-total';
import numeral from 'numeral';
import { Link } from 'react-router-dom';


export const ExpenseSummary = (props) => {
  const wording = props.expenseCount === 1 ? 'expense' : 'expenses';
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{props.expenseCount}</span> {wording} totalling <span>{numeral(props.expenseTotal / 100).format('$0,00.00')}</span></h1>
        <div className="page-hader__actions">
          <Link className="button" to="create">Create expense</Link>
        </div>
      </div>
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
