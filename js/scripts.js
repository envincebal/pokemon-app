var pokemonRepository = (function () {
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

  function addListItem(pokemon) {
    var $pokemonList = document.querySelector("ul");
    var $listItem = document.createElement("li");
    var $button = document.createElement("button");

    $button.innerText = pokemon.name;
    $button.classList.add("list-button");
    $pokemonList.appendChild($listItem);
    $listItem.appendChild($button)
    addListener($button, pokemon);
  }

  function addListener(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function getAll() {
    return repository;
  }

  return {
    addListItem: addListItem,
    getAll: getAll
  };
})();


pokemonRepository.getAll().forEach(pokemon => {
  pokemonRepository.addListItem(pokemon);
});