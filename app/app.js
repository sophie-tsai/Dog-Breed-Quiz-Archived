import React from "react";
import AnswerChoice from "./AnswerChoice";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      breed: ""
    };
    this.handleNameSwap = this.handleNameSwap.bind(this);
  }

  handleNameSwap(breedName) {
    console.log(breedName);
    if (breedName.includes("-")) {
      const breedNameSwapped = breedName.split("-");
      let a = breedNameSwapped[0];
      let b = breedNameSwapped[1];
      [a, b] = [b, a];
      breedName = [a, b].join(" ");
    }
    return breedName;
  }

  componentDidMount() {
    const dogData = fetch("https://dog.ceo/api/breeds/image/random");
    dogData
      .then(response => response.json())
      .then(data => {
        const { message } = data;
        const end = message.lastIndexOf("/");
        let breedName = message
          .split("")
          .slice(30, end)
          .join("");
        breedName = this.handleNameSwap(breedName);
        this.setState({
          breed: breedName,
          image: data.message
        });
      });
  }

  render() {
    return (
      <div>
        <div className="whiteDiv">
          <h1 className="title">
            So You Think You Know <br /> Dog Breeds?{" "}
          </h1>
          <br />
          <img className="dogImage" src={this.state.image} />
        </div>
        <AnswerChoice correctAnswer={this.state.breed} />
      </div>
    );
  }
}

export default App;
