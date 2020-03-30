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
          key={Math.floor(Math.random() * 1000)}
          text={breed}
          borderColor={borderColor}
          handleChoice={this.handleChoice}
        />
      );
    });

    return (
      <div>{answerChoices}</div>
      // <div className="container">
      //   <div className="row justify-content-center">
      //     <AnswerChoices
      //       className="col"
      //       key={0}
      //       text={this.state.multipleChoiceAnswers[0]}
      //       handleChoice={this.handleChoice}
      //     />
      //     <AnswerChoices
      //       className="col"
      //       key={1}
      //       text={this.state.multipleChoiceAnswers[1]}
      //       handleChoice={this.handleChoice}
      //     />
      //   </div>
      //   <div className="row justify-content-center">
      //     <AnswerChoices
      //       className="col"
      //       key={2}
      //       text={this.state.multipleChoiceAnswers[2]}
      //       handleChoice={this.handleChoice}
      //     />
      //     <AnswerChoices
      //       className="col"
      //       key={3}
      //       text={this.state.multipleChoiceAnswers[3]}
      //       handleChoice={this.handleChoice}
      //     />
      //   </div>
      // </div>
    );
  }
}
export default AnswerContainer;
