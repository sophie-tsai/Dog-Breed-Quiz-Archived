import AnswerChoices from "./AnswerChoice";
import React from "react";

class AnswerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleChoiceAnswers: props.data
    };
    this.handleChoice = this.handleChoice.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    //in a static method we cannot use this keyword
    if (props.data !== state.multipleChoiceAnswers) {
      return {
        multipleChoiceAnswers: props.data
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  handleChoice() {}

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <AnswerChoices
            className="col"
            key={0}
            multiChoiceAnswer={this.state.multipleChoiceAnswers[0]}
          />
          <AnswerChoices
            className="col"
            key={1}
            multiChoiceAnswer={this.state.multipleChoiceAnswers[1]}
          />
        </div>
        <div className="row justify-content-center">
          <AnswerChoices
            className="col"
            key={2}
            multiChoiceAnswer={this.state.multipleChoiceAnswers[2]}
          />
          <AnswerChoices
            className="col"
            key={3}
            multiChoiceAnswer={this.state.multipleChoiceAnswers[3]}
          />
        </div>
      </div>
    );
  }
}
export default AnswerContainer;
