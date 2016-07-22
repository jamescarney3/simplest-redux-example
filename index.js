import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// React component
const Counter = React.createClass({
  propTypes: {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
  },

  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    );
  }
});

// Action
const increaseAction = { type: 'increase' };

// Reducer
const counter = function(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
};

// Store
const store = createStore(counter);

// Map Redux state to component props
const mapStateToProps = function(state) {
  return {
    value: state.count
  }
};

// Map Redux actions to component props
const mapDispatchToProps = function(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
};

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
