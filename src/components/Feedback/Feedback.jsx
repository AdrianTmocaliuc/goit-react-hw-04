import { Component, useReducer, useState } from 'react';
import { Section } from 'components/Utilits/index';
import Notification from './Notification/Notification';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';

import React from 'react';

const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const initialTypes = {
  good: 'good',
  neutral: 'neutral',
  bad: 'bad',
  reset: 'reset',
};

// function reset() {
//   return INITIAL_STATE
// }

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case initialTypes.good:
      return { ...state, good: state.good + 1 };
    case initialTypes.neutral:
      return { ...state, neutral: state.neutral + 1 };
    case initialTypes.bad:
      return { ...state, bad: state.bad + 1 };
    case initialTypes.reset:
      return INITIAL_STATE;

    default:
      break;
  }
}

function Feedback() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { good, neutral, bad } = state;

  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    // return good + neutral + bad;
    return Object.values(state).reduce((acc, elem) => {
      return acc + elem;
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return (
      Math.round(countTotalFeedback() && (good / countTotalFeedback()) * 100) +
      '%'
    );
  };

  const changeState = ({ target }) => {
    const name = target.name;
    // console.log(type);
    dispatch({ type: name });
    // switch (type) {
    //   case 'good':
    //     // setGood(prev => prev + 1);
    //     break;
    //   case 'neutral':
    //     // setNeutral(prev => prev + 1);
    //     break;
    //   case 'bad':
    //     // setBad(prev => prev + 1);
    //     break;
    //   default:
    //     break;
    // }
  };

  const array = [
    ['good', good],
    ['neutral', neutral],
    ['bad', bad],
    ['total', countTotalFeedback()],
    ['positive Feedback', countPositiveFeedbackPercentage()],
  ];
  // console.log(array);
  // console.log(countTotalFeedback());

  return (
    <div>
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={INITIAL_STATE}
            onLeaveFeedback={changeState}
          />
        </Section>

        <Section title="Statistics">
          {countTotalFeedback() ? (
            <Statistics props={array} />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    </div>
  );
}
class OldFeedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    // const { good, neutral, bad } = this.state;
    // return good + neutral + bad;
    return Object.values(this.state).reduce((acc, elem) => {
      return acc + elem;
    }, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const { state, countTotalFeedback } = this;
    return (
      Math.round(
        countTotalFeedback() && (state.good / countTotalFeedback()) * 100
      ) + '%'
    );
  };

  changeState = e => {
    const text = e.target.textContent;

    this.setState(prevState => ({
      ...prevState,
      [text]: prevState[text] + 1,
    }));
  };

  render() {
    // const { good, neutral, bad } = this.state;
    const { countTotalFeedback, countPositiveFeedbackPercentage, changeState } =
      this;
    const total = countTotalFeedback();
    const array = [
      ...Object.entries(this.state),
      ['total', total],
      ['positive Feedback', countPositiveFeedbackPercentage()],
    ];

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions options={this.state} onLeaveFeedback={changeState} />
        </Section>

        <Section title="Statistics">
          {total ? (
            <Statistics props={array} />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}

export default Feedback;
