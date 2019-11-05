"use strict";

var pokedex = document.getElementById('pokedex');
var pokemons = {};

var fetchPokemon = function fetchPokemon() {
  var promises = [];

  for (var i = 1; i <= 40; i++) {
    var url = "https://pokeapi.co/api/v2/pokemon/".concat(i);
    promises.push(fetch(url).then(function (res) {
      return res.json();
    }));
  }

  Promise.all(promises).then(function (results) {
    var pokemon = results.map(function (result) {
      return {
        name: result.name,
        image: result.sprites.front_default,
        type: result.types.map(function (type) {
          return type.type.name;
        }).join(', '),
        id: result.id
      };
    });

    pokemons = pokemon;

    displayPokemon(pokemons);
    
    setTimeout(() => {
      document.querySelector('body').classList.add('success');
    }, 3000);
    
  });
};

var filterPokemon = function filterPokemon(name){
  var result = name ? pokemons.filter((val) => val.name.indexOf(name.toLowerCase()) !== -1) : pokemons;

  displayPokemon(result);
}

var displayPokemon = function displayPokemon(pokemon) {
  var pokemonHTMLString = pokemon.map(function (pokeman) {
    return "\n        <li class=\"card\">\n            <img class=\"card-image\" src=\"".concat(pokeman.image, "\"/>\n            <h2 class=\"card-title\">").concat(pokeman.name, "</h2>\n            <p class=\"card-subtitle\">Tipo: ").concat(pokeman.type, "</p>\n        </li>\n    ");
  }).join('');
  pokedex.innerHTML = pokemonHTMLString;
};

var alterarTituloNavegador = function alterarTituloNavegador(){

  var frases = [
    'Você tem o poder de construir seu próprio caminho',
    'Por mais diferentes que sejamos, todos temos mais em comum do que imaginamos!',
    'A amizade e trabalho de equipe está acima de tudo!',
    'Pokémon e romance: o amor conta mais que tudo!',
    'Sempre que necessário, coloque limites (ainda mais se você for uma mulher)',
    'As lições de Pokémon: entenda que há valor e também riscos na ingenuidade'
  ];
  
  setInterval(function(){
    document.title = frases[Math.floor(Math.random() * 5)]
  }, 3000);

}

alterarTituloNavegador();

fetchPokemon();