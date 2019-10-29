var repository = [{
  name: "Charmander",
  height: 0.6,
  types: ["fire"]
}, {
  name: "Bulbasaur",
  height: 0.7,
  types: ["grass", "poison"]
}, {
  name: "Squirtle",
  height: 0.5,
  types: ["water"]
}];

for (let i = 0; i < repository.length; i++) {
  var pokemon = repository[i];
  if (pokemon.height > 0.6) {
    document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ") - Wow, that's big!</p>");
  } else {
    document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")</p>");
  }
}