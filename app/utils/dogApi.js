import breeds from "../breedsData";

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

export { retrieveBreedName, configureBreedNames, handleNameSwap };
