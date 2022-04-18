import { Component } from "react";
import { Section } from "components/Utilits/index";
import Notification from "./Notification/Notification";
import Statistics from "./Statistics/Statistics";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";

class Feedback extends Component {
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
      ) + "%"
    );
  };

  changeState = (e) => {
    const text = e.target.textContent;

    this.setState((prevState) => ({
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
      ["total", total],
      ["positive Feedback", countPositiveFeedbackPercentage()],
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
