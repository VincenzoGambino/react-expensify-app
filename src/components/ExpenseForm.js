import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: true,
      error: ''
    };
  }


  handleDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description}));
  };

  handleAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  handleNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  handleDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }
  };

  handleFocusChange = (({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  });

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({error: 'Please provide description and amount'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder='Description'
            autoFocus
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <input
            type="text"
            placeholder='Amount'
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.handleDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.handleFocusChange}
            numberOfMonths={1}
            isOutsideRange={(day) =>  false}

          />
          <textarea
            placehodlder="Please add note (Optional)"
            value={this.state.note}
            onChange={this.handleNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}