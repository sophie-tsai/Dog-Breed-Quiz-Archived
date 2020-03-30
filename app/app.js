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
    this.fetchDoggo = this.fetchDoggo.bind(this);
    this.increment = this.increment.bind(this);
    this.getMultiChoiceAnswers = this.getMultiChoiceAnswers.bind(this);
    this.getRandomDog = this.getRandomDog.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    //member variable
    this.fullBreedNames = DogAPi.configureBreedNames();
  }

  componentDidMount() {
    this.fetchDoggo();
  }

  getRandomDog() {
    const chooseRandomDog = this.fullBreedNames[
      Math.floor(Math.random() * this.fullBreedNames.length)
    ];
    return chooseRandomDog;
  }

  getMultiChoiceAnswers(correctBreedName) {
    // Add the correct breedName into the set
    const multipleChoicesSet = new Set([correctBreedName]);

    // While the set is not equal to 4
    while (multipleChoicesSet.size <= 3) {
      let randomDogBreed = this.getRandomDog();

      //  Add a random dog breed name, NOT dog object to the set
      multipleChoicesSet.add(randomDogBreed);
    }
    // If we exited while then we have 4 dog names in a set

    // Convert set to array of dog objects
    const multipleChoiceArray = Array.from(multipleChoicesSet);
    const multipleChoiceArrayOfObjects = multipleChoiceArray.map(breedName => ({
      breed: breedName
    }));

    // Shuffle
    multipleChoiceArrayOfObjects.sort(() => 0.5 - Math.random());
    return multipleChoiceArrayOfObjects;
  }

  fetchDoggo() {
    const dogData = fetch("https://dog.ceo/api/breeds/image/random");
    dogData
      .then(response => response.json())
      .then(data => {
        // Breed work
        let correctBreedName = DogAPi.retrieveBreedName(data);
        correctBreedName = DogAPi.handleNameSwap(correctBreedName);
        const updatedChoices = this.getMultiChoiceAnswers(correctBreedName);
        this.setState({
          image: data.message,
          breed: correctBreedName,
          multipleChoiceAnswers: updatedChoices
        });
      });
    dogData.catch(this.error);
  }

  handleArrowClick() {
    event.preventDefault();
    if (this.state.questionNumber <= 9) {
      this.setState(prevState => {
        return {
          questionNumber: prevState.questionNumber + 1
        };
      });
      this.fetchDoggo();
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
    this.fetchDoggo();
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
