import AnswerChoices from "./AnswerChoice";
import React from "react";

class AnswerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleChoiceAnswers: [],
      breed: "",
      userSelectedAnswer: "",
      wasChoiceSelected: false
      // isCorrectAnswer: false
    };
    this.handleChoice = this.handleChoice.bind(this);
    this.showAnswerResult = this.showAnswerResult.bind(this);
    this.getUpdateMultipleChoiceAnswers = this.getUpdateMultipleChoiceAnswers.bind(
      this
    );
    this.onAnswerCorrect = props.data.incrementScore;
  }

  // this method gets called before render and everytime the state changes / we get new props
  static getDerivedStateFromProps(props, state) {
    const { multipleChoiceAnswers, breed } = props.data;
    //in a static method we cannot use this keyword
    if (breed !== state.breed) {
      return {
        multipleChoiceAnswers: multipleChoiceAnswers,
        breed: breed,
        wasChoiceSelected: false
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  handleChoice(event, text) {
    // So page doesn't refresh when button is pressed
    event.preventDefault();
    //prevents the user from choosing an answer after they've chosen one
    if (this.state.wasChoiceSelected) {
      return;
    }
    this.showAnswerResult(text);
  }

  getUpdateMultipleChoiceAnswers(selectedChoiceText) {
    return this.state.multipleChoiceAnswers.map(multipleChoice => {
      // If the selected one is the current element
      if (selectedChoiceText === multipleChoice.breed) {
        // IF what is selected is the correct answer
        if (selectedChoiceText === this.state.breed) {
          this.onAnswerCorrect();
          return {
            borderColor: "green",
            breed: selectedChoiceText
          };
        }

        // If what is selected is incorrect answer
        return {
          borderColor: "red",
          breed: selectedChoiceText
        };
      }

      // No change for all others
      return multipleChoice;
    });
  }

  showAnswerResult(id) {
    const updatedChoices = this.getUpdateMultipleChoiceAnswers(id);
    this.setState({
      multipleChoiceAnswers: updatedChoices,
      userSelectedAnswer: id,
      wasChoiceSelected: true
    });
  }

  render() {
    const answerChoices = this.state.multipleChoiceAnswers.map(element => {
      const { breed, borderColor } = element;

      // console.log(element);
      // console.log(breed);
      return (
        <AnswerChoices
          key={breed}
          text={breed}
          borderColor={borderColor}
          handleChoice={this.handleChoice}
        />
      );
    });

    return <div>{answerChoices}</div>;
  }
}
export default AnswerContainer;
