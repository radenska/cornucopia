'use strict';

module.exports = function() {
  return function(recipe, searchTerm) {
    let fuzzyRegex = generateFuzzyRegex(searchTerm);

    return recipe.filter( recipe => {
      return fuzzyRegex.test(recipe.name.toUpperCase());
    });
  };
};

function generateFuzzyRegex(input) {
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
};