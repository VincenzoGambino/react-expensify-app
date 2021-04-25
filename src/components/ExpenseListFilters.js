import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setSortBy, setStartDate, setEndDate  } from  '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);

  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}));
  }

  onTextChange = ((e) => {
    this.props.setTextFilter(e.target.value);
  });

  onSelectChange = ((e) => {
    this.props.setSortBy(e.target.value);
  });
   render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input placeholder="Search expenses" className="input-text" type="text" value={this.props.filters.text} onChange={ this.onTextChange }/>
          </div>
          <div className="input-group__item">
            <select className="select" value={this.props.filters.setSortBy} onChange={this.onSelectChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDates={true}
            />
          </div>
        </div>
        
        
       
      </div>
    );
   }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTextFilter: (text) => {
      dispatch(setTextFilter(text))
    },
    setSortBy: (sortBy) => {
      dispatch(setSortBy(sortBy))
    },
    setStartDate: (startDate) => {
      dispatch(setStartDate(startDate))
    },
    setEndDate: (endDate) => {
      dispatch(setEndDate(endDate))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);