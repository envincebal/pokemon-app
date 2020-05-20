const pokemonRepository = (() => {
  const repository = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  const $modalContainer = document.querySelector(".modal");
  const $overlay = document.querySelector(".overlay");

  function loadList() {
    return fetch(apiUrl)
      .then(res => res.json())
      .then(pokemonList => {
        const response = pokemonList.results;
        response.forEach((item, index) => {
          const nameCapitalized = item.name.charAt(0).toUpperCase() + item.name.slice(1)
          const pokemon = {
            name: nameCapitalized,
            detailsUrl: item.url,
            index: index + 1
          };
          add(pokemon);
        });
      }).catch(err => {
        console.log(err);
      });
  }

  function add(item) {
    repository.push(item);
  }

  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(res => res.json())
      .then(details => {
        const types = details.types;
        const typeList = [];

        types.forEach(iterate => {
          typeList.push(iterate.type.name);
        })

        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.type = typeList.join(", ");
      }).catch(err => console.log(err))
  }

  function addListItem(pokemon) {
    const $pokemonList = document.querySelector("ul");
    const $listItem = document.createElement("li");
    const $button = document.createElement("button");

    $button.innerText = pokemon.index + ". " + pokemon.name;
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

  function showDetails(item) {
    const $pokemonName = document.querySelector(".pokemon-name");
    const $pokemonImg = document.querySelector(".pokemon-img");
    const $pokemonHeight = document.querySelector(".pokemon-height");
    const $pokemonWeight = document.querySelector(".pokemon-weight");
    const $pokemonType = document.querySelector(".pokemon-type");

    pokemonRepository.loadDetails(item)
      .then(() => {
        $modalContainer.classList.add("modal-visible");
        $overlay.classList.add("overlay-visible");
        $modalContainer.classList.remove("modal");
        $pokemonName.textContent = item.name;
        $pokemonImg.src = item.imageUrl;
        $pokemonHeight.textContent = item.height;
        $pokemonWeight.textContent = item.weight;
        $pokemonType.textContent = item.type;
      });
  }

  function hideDetails() {
    $modalContainer.classList.remove("modal-visible");
    $overlay.classList.remove("overlay-visible");
    $modalContainer.classList.add("modal");
  }

  document.querySelector(".modal-close").addEventListener("click", () => {
    hideDetails();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $modalContainer.classList.contains("modal-visible")) {
      hideDetails();
    }
  });

  $overlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === $overlay) {
      hideDetails();
    }
  });

  function getAll() {
    return repository;
  }

  return {
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    getAll: getAll
  };
})();

pokemonRepository.loadList()
  .then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
    });
  });