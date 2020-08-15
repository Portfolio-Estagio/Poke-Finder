const config = require("./Pokemons.json");

getCharPosition = function(pokename) {
  let positions = {};
  for (let i = 0; i < pokename.length; i++) {
    const char = pokename[i];
    if (char != "_") positions[i] = pokename.charAt(i);
    positions["size"] = pokename.length;
  }
  return positions;
};

getPokemonEquivalent = function(charList) {
  let pokesFound = [];

  config.forEach(pokes => {
    //let times = [];
    let times = 0;

    for (let i = 0; i < Object.keys(charList).length; i++) {
      let position = Object.keys(charList)[i],
        value = charList[position];

      if (getCharPosition(pokes.nome.toLowerCase())[position] == value) {
        //times.push(true);
        times++;

        if (/*times.length*/ times == Object.keys(charList).length) {
          pokesFound.push(pokes);
          break;
        }
      }
    }
  });
  return pokesFound;
};

module.exports = {
  getCharPosition: getCharPosition,
  getPokemonEquivalent: getPokemonEquivalent
};
