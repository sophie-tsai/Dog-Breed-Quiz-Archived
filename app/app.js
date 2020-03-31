import React from "react";

import AnswerContainer from "./AnswerContainer";
import { FaArrowRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdFiberNew } from "react-icons/md";
import * as DogAPi from "./utils/dogApi";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      breed: "",
      err: "",
      multipleChoiceAnswers: [],
      score: 0,
      questionNumber: 1
    };

    this.error = this.error.bind(this);
    this.increment = this.increment.bind(this);
    this.getDoggoData = this.getDoggoData.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
  }

  getDoggoData() {
    const fetchDoggoPromise = DogAPi.fetchDoggo();

    fetchDoggoPromise.then(data => {
      const { correctBreedName, image, multipleChoiceAnswers } = data;
      this.setState({
        image: image,
        breed: correctBreedName,
        multipleChoiceAnswers: multipleChoiceAnswers
      });
    });

    fetchDoggoPromise.catch(this.error);
  }

  componentDidMount() {
    this.getDoggoData();
  }

  handleArrowClick() {
    event.preventDefault();
    if (this.state.questionNumber <= 9) {
      this.setState(prevState => {
        return {
          questionNumber: prevState.questionNumber + 1
        };
      });
      this.getDoggoData();
    }
  }

  increment() {
    this.setState(prevState => {
      return {
        score: prevState.score + 1
      };
    });
  }

  handleNewGame() {
    this.setState({
      questionNumber: 1,
      score: 0
    });
    this.getDoggoData();
  }

  error() {
    this.setState({ err: "Oops, something went wrong! :-(" });
  }

  render() {
    return (
      <div>
        <span className="title">So You Think You Know Dog Breeds?</span>
        <br />
        <span className="score">
          Score: {this.state.score} - Round {this.state.questionNumber}
        </span>

        <div className="container-fluid mt-3">
          <div className="row justify-content-center align-items-center contentContainer">
            <div className="col-lg-4">
              {this.state.err.length !== 0 ? <p>{this.state.err}</p> : null}
              <img className="dogImage" src={this.state.image} />
            </div>

            <div className="multipleChoiceContainer col-lg-3">
              <AnswerContainer
                data={{
                  breed: this.state.breed,
                  multipleChoiceAnswers: this.state.multipleChoiceAnswers,
                  incrementScore: this.increment
                }}
              />
            </div>
            <button className="arrowIcon" onClick={this.handleArrowClick}>
              <IconContext.Provider value={{ size: "2em" }}>
                <FaArrowRight />
              </IconContext.Provider>
            </button>
            <button className="newIcon" onClick={this.handleNewGame}>
              <IconContext.Provider value={{ size: "2.5em" }}>
                <MdFiberNew />
              </IconContext.Provider>
            </button>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
