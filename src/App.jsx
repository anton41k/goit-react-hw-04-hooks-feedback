import { useState } from "react";

import Section from "./components/Section/Section";
import Statistics from "./components/Statistics/Statistics";
import FeedbackOptions from "./components/FeedbackOptions/FeedbackOptions";
import Notification from "./components/Notification/Notification";
import LegendStatistics from "./components/LegendStatistics/LegendStatistics";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const state = { good: setGood, neutral: setNeutral, bad: setBad };

  const vote = (data) => {
    const rangVote = data.target.name;
    state[rangVote]((prevState) => prevState + 1);
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return good ? ((good * 100) / countTotalFeedback()).toFixed(0) : 0;
  };

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={["good", "neutral", "bad"]}
        onLeaveFeedback={vote}
      />
      <LegendStatistics title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </LegendStatistics>
    </Section>
  );
}
