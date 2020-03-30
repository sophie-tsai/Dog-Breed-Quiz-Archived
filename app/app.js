import React from "react";

import AnswerContainer from "./AnswerContainer";
import { FaArrowRight } from "react-icons/fa";
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

    this.getMultiChoiceAnswers = this.getMultiChoiceAnswers.bind(this);
    this.getRandomDog = this.getRandomDog.bind(this);

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
    if (this.state.questionNumber <= 10) {
      this.setState(prevState => {
        this.state.questionNumber = prevState.questionNumber + 1;
      });
      this.fetchDoggo();
    }
  }

  error() {
    this.setState({ err: "Oops, something went wrong! :-(" });
  }

  render() {
    return (
      <div>
        <span className="title">So You Think You Know Dog Breeds?</span>
        <br />
        <span className="score">{this.state.score}/10 </span>

        <div className="container-fluid mt-3">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-4">
              {this.state.err.length !== 0 ? <p>{this.state.err}</p> : null}
              <img className="dogImage" src={this.state.image} />
            </div>

            <div className="multipleChoiceContainer col-lg-3">
              <AnswerContainer
                data={{
                  breed: this.state.breed,
                  multipleChoiceAnswers: this.state.multipleChoiceAnswers
                }}
              />
            </div>
            <button className="arrow" onClick={this.handleArrowClick}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
