import moment from 'moment';

const filters = {
  tex: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};


const AltFilters = {
  tex: 'Bill',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
};

export { filters, AltFilters };
