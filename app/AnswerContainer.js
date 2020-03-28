import AnswerChoices from "./AnswerChoice";
import React from "react";

class AnswerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleChoiceAnswers: [],
      breed: "",
      userSelectedAnswer: ""
      // isCorrectAnswer: false
    };
    this.handleChoice = this.handleChoice.bind(this);
    this.showAnswerResult = this.showAnswerResult.bind(this);
  }

  // this is a native method called by react whenever the prop could change
  //checks to see if the state from prop you're passing thru is changing
  //if it is, update the state, if not, do nothing
  static getDerivedStateFromProps(props, state) {
    const { multipleChoiceAnswers, breed } = props.data;
    //in a static method we cannot use this keyword
    if (
      multipleChoiceAnswers !== state.multipleChoiceAnswers ||
      breed !== state.breed
    ) {
      return {
        multipleChoiceAnswers: multipleChoiceAnswers,
        breed: breed
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  handleChoice(event, text) {
    event.preventDefault();
    text === this.state.breed
      ? console.log("correct") //choice border turn green
      : console.log("incorrect"); //choice border turn red
    this.setState({ userSelectedAnswer: text });
    // console.log(this.state.userSelectedAnswer);
    this.showAnswerResult(this.state.userSelectedAnswer);
  }

  showAnswerResult(id) {
    this.setState(prevState => {
      const updatedColor = prevState.multipleChoiceAnswers.map(
        multipleChoice => {
          if (id === multipleChoice) {
            if (id === this.breed) {
              // console.log("green");
              return {
                borderColor: "green",
                breed: id
              };
            }
            return {
              borderColor: "red",
              breed: id
            };
          }

          return multipleChoice;
        }
      );
      return {
        multipleChoiceAnswers: updatedColor
      };
    });
  }

  render() {
    // console.log(this.state.multipleChoiceAnswers);
    const answerChoices = this.state.multipleChoiceAnswers.map(element => {
      const { breed } = element;

      // console.log(element);
      // console.log(breed);
      return (
        <AnswerChoices
          className="col"
          key={Math.floor(Math.random() * 1000)}
          text={breed}
          borderColor={this.props.borderColor}
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
