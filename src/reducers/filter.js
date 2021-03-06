import moment from 'moment';

const filtersReducerDefault = 
  {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  };

 export default ((state = filtersReducerDefault, action) => {
    switch (action.type) {
      case 'SET_TEXT_FILTER':
        return {
          ...state,
          text: action.text
        };
      case 'SORT_BY':
        return {
          ...state,
          sortBy: action.sortBy ? action.sortBy : 'date'
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