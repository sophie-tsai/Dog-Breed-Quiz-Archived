const breeds = {
  affenpinscher: [],
  african: [],
  airedale: [],
  akita: [],
  appenzeller: [],
  australian: ["shepherd"],
  basenji: [],
  beagle: [],
  bluetick: [],
  borzoi: [],
  bouvier: [],
  boxer: [],
  brabancon: [],
  briard: [],
  buhund: ["norwegian"],
  bulldog: ["boston", "english", "french"],
  bullterrier: ["staffordshire"],
  cairn: [],
  cattledog: ["australian"],
  chihuahua: [],
  chow: [],
  clumber: [],
  cockapoo: [],
  collie: ["border"],
  coonhound: [],
  corgi: ["cardigan"],
  cotondetulear: [],
  dachshund: [],
  dalmatian: [],
  dane: ["great"],
  deerhound: ["scottish"],
  dhole: [],
  dingo: [],
  doberman: [],
  elkhound: ["norwegian"],
  entlebucher: [],
  eskimo: [],
  frise: ["bichon"],
  germanshepherd: [],
  greyhound: ["italian"],
  groenendael: [],
  havanese: [],
  hound: ["afghan", "basset", "blood", "english", "ibizan", "plott", "walker"],
  husky: [],
  keeshond: [],
  kelpie: [],
  komondor: [],
  kuvasz: [],
  labrador: [],
  leonberg: [],
  lhasa: [],
  malamute: [],
  malinois: [],
  maltese: [],
  mastiff: ["bull", "english", "tibetan"],
  mexicanhairless: [],
  mix: [],
  mountain: ["bernese", "swiss"],
  newfoundland: [],
  otterhound: [],
  papillon: [],
  pekinese: [],
  pembroke: [],
  pinscher: ["miniature"],
  pitbull: [],
  pointer: ["german", "germanlonghair"],
  pomeranian: [],
  poodle: ["miniature", "standard", "toy"],
  pug: [],
  puggle: [],
  pyrenees: [],
  redbone: [],
  retriever: ["chesapeake", "curly", "flatcoated", "golden"],
  ridgeback: ["rhodesian"],
  rottweiler: [],
  saluki: [],
  samoyed: [],
  schipperke: [],
  schnauzer: ["giant", "miniature"],
  setter: ["english", "gordon", "irish"],
  sheepdog: ["english", "shetland"],
  shiba: [],
  shihtzu: [],
  spaniel: [
    "blenheim",
    "brittany",
    "cocker",
    "irish",
    "japanese",
    "sussex",
    "welsh"
  ],
  springer: ["english"],
  stbernard: [],
  terrier: [
    "american",
    "australian",
    "bedlington",
    "border",
    "dandie",
    "fox",
    "irish",
    "kerryblue",
    "lakeland",
    "norfolk",
    "norwich",
    "patterdale",
    "russell",
    "scottish",
    "sealyham",
    "silky",
    "tibetan",
    "toy",
    "westhighland",
    "wheaten",
    "yorkshire"
  ],
  vizsla: [],
  waterdog: ["spanish"],
  weimaraner: [],
  whippet: [],
  wolfhound: ["irish"]
};

// const keyBreeds = Object.keys(breeds);
// const fullBreedNames = [];

// keyBreeds.forEach(props => {
//   const subBreedNames = breeds[props];
//   let propName = props;
//   if (subBreedNames.length >= 1) {
//     subBreedNames.forEach(name => fullBreedNames.push(`${name} ${propName}`));
//   } else {
//     fullBreedNames.push(props);
//   }
// });

// function getRandomDog() {
//   const chooseRandomDog =
//     fullBreedNames[Math.floor(Math.random() * fullBreedNames.length)];
//   return chooseRandomDog;
// }
// function populateMultipleChoices() {
//   const wrongAnswers = [];
//   while (wrongAnswers.length <= 2) {
//     let randomDogBreed = getRandomDog();
//     if (!wrongAnswers.includes(randomDogBreed)) {
//       wrongAnswers.push(randomDogBreed);
//     }
//   }
//   return wrongAnswers;
// }

// const multipleChoices = populateMultipleChoices();

export default breeds;
