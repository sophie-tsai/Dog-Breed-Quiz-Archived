import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      breed: ""
    };
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => {
        const { message } = data;
        const end = message.lastIndexOf("/");
        const breedName = message
          .split("")
          .slice(30, end)
          .join("");
        this.setState({
          breed: breedName,
          image: data.message
        });
      });
  }

  render() {
    return (
      <div>
        <h1 className="title">So You Think You Know Dog Breeds? </h1>
        <br />
        <img className="dogImage" src={this.state.image} />
        <p>{this.state.breed}</p>
      </div>
    );
  }
}

export default App;
