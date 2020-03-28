import React from "react";
import breeds from "./breedsData";
import AnswerContainer from "./AnswerContainer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      breed: "",
      err: "",
      multipleChoiceAnswers: []
    };

    this.handleNameSwap = this.handleNameSwap.bind(this);
    this.retrieveBreedName = this.retrieveBreedName.bind(this);
    this.error = this.error.bind(this);
    this.fetchDoggo = this.fetchDoggo.bind(this);
    this.configureBreedNames = this.configureBreedNames.bind(this);
    this.getMultiChoiceAnswers = this.getMultiChoiceAnswers.bind(this);
    this.getRandomDog = this.getRandomDog.bind(this);
    this.populateMultipleChoices = this.populateMultipleChoices.bind(this);
    this.shuffleChoices = this.shuffleChoices.bind(this);
    //member variable
    this.fullBreedNames = this.configureBreedNames(breeds);
  }

  componentDidMount() {
    this.fetchDoggo();
  }

  configureBreedNames(breeds) {
    const keyBreeds = Object.keys(breeds);
    const fullBreedNameArr = [];

    keyBreeds.forEach(props => {
      const subBreedNames = breeds[props];
      let propName = props;
      if (subBreedNames.length >= 1) {
        subBreedNames.forEach(name =>
          fullBreedNameArr.push(`${name} ${propName}`)
        );
      } else {
        fullBreedNameArr.push(props);
      }
    });
    return fullBreedNameArr;
  }

  getRandomDog(fullBreedNameArr) {
    const chooseRandomDog =
      fullBreedNameArr[Math.floor(Math.random() * fullBreedNameArr.length)];
    return { breed: chooseRandomDog };
  }

  populateMultipleChoices(array) {
    while (array.length <= 3) {
      let randomDogBreed = this.getRandomDog(this.fullBreedNames);
      if (!array.includes(randomDogBreed)) {
        array.push(randomDogBreed);
      }
    }
    return array;
  }

  getMultiChoiceAnswers(breedValue) {
    let multipleChoices = [];
    multipleChoices.push({ breed: breedValue });
    multipleChoices = this.populateMultipleChoices(multipleChoices);
    this.shuffleChoices(multipleChoices);
    return multipleChoices;
  }

  fetchDoggo() {
    const dogData = fetch("https://dog.ceo/api/breeds/image/random");
    dogData
      .then(response => response.json())
      .then(data => {
        // Breed work
        let breedName = this.retrieveBreedName(data);
        breedName = this.handleNameSwap(breedName);
        const updatedChoices = this.getMultiChoiceAnswers(breedName);
        this.setState({
          image: data.message,
          breed: breedName,
          multipleChoiceAnswers: updatedChoices
        });
      });
    dogData.catch(this.error);
  }

  shuffleChoices(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const temp = array[array.length - 1];
    array[array.length - 1] = array[randomIndex];
    array[randomIndex] = temp;
    return array;
  }

  handleNameSwap(breedName) {
    if (breedName.includes("-")) {
      const breedNameSwapped = breedName.split("-");
      let a = breedNameSwapped[0];
      let b = breedNameSwapped[1];
      [a, b] = [b, a];
      breedName = [a, b].join(" ");
    }
    return breedName;
  }

  retrieveBreedName(data) {
    const { message } = data;
    const end = message.lastIndexOf("/");
    let breedName = message
      .split("")
      .slice(30, end)
      .join("");
    return breedName;
  }

  error() {
    this.setState({ err: "Oops, something went wrong! :-(" });
  }

  render() {
    return (
      <div>
        <span className="title">
          So You Think You Know <br /> Dog Breeds?
        </span>
        <br />
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
