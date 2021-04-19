import { createStore} from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({setTo = 1} = {}) => ({
    type: 'SET',
    setTo
});

const resetCount = () => ({
    type: 'RESET',
    setTo: 0
});

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'RESET':
        return {
            count: action.setTo
        };
        case 'SET':
            return {
                count: action.setTo
            }
        default: 
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(decrementCount({decrementBy: 10}));
store.dispatch(setCount({setTo: 101}));
store.dispatch(resetCount());