import breeds from "../breedsData";

const fullBreedNames = configureBreedNames();

function retrieveBreedName(data) {
  const { message } = data;
  const end = message.lastIndexOf("/");
  let breedName = message
    .split("")
    .slice(30, end)
    .join("");
  return breedName;
}

function configureBreedNames() {
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

function handleNameSwap(breedName) {
  if (breedName.includes("-")) {
    const breedNameSwapped = breedName.split("-");
    let a = breedNameSwapped[0];
    let b = breedNameSwapped[1];
    [a, b] = [b, a];
    breedName = [a, b].join(" ");
  }
  return breedName;
}

function fetchDoggo() {
  const dogPromise = fetch("https://dog.ceo/api/breeds/image/random");
  return dogPromise
    .then(response => response.json())
    .then(data => {
      // Breed work
      let correctBreedName = retrieveBreedName(data);
      correctBreedName = handleNameSwap(correctBreedName);

      const updatedChoices = getMultiChoiceAnswers(correctBreedName);
      console.log(updatedChoices);
      return {
        correctBreedName: correctBreedName,
        image: data.message,
        multipleChoiceAnswers: updatedChoices
      };
    });
}

function getRandomDog() {
  const chooseRandomDog =
    fullBreedNames[Math.floor(Math.random() * fullBreedNames.length)];
  return chooseRandomDog;
}

function getMultiChoiceAnswers(correctBreedName) {
  // Add the correct breedName into the set
  const multipleChoicesSet = new Set([correctBreedName]);

  // While the set is not equal to 4
  while (multipleChoicesSet.size <= 3) {
    let randomDogBreed = getRandomDog();

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

export { retrieveBreedName, configureBreedNames, handleNameSwap, fetchDoggo };
