import { useReducer } from 'react';
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
    dispatch({ type: name });
  };

  const array = [
    ['good', good],
    ['neutral', neutral],
    ['bad', bad],
    ['total', countTotalFeedback()],
    ['positive Feedback', countPositiveFeedbackPercentage()],
  ];

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

export default Feedback;
