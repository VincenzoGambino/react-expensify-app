import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({id, description, amount, createdAt}, props) => {
  return (
    <div>
      <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
      <p>Amount: {amount} - Create at: {createdAt}</p>
    </div>
  );
};

export default ExpenseListItem;