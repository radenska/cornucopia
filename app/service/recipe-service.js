'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', recipeService];

function recipeService($q, $log, $http, $window, authService) {
  $log.debug('recipeService');

  let service = {};
  service.recipes = [];

  service.createRecipe = function(recipe) {
    $log.debug('recipeService.createRecipe');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/recipe`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, recipe, config)
    })
    .then( res => {
      $log.log('recipe created');
      service.recipes.unshift(recipe);
      return recipe;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchRecipes = function() {
    $log.debug('recipeService.fetchRecipes');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/recipe`;
      let config = {
        headers: {
          Accept: 'application/json'
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('recipes retrieved');
      service.recipes = res.data;
      return service.recipes;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateRecipe = function(recipeID, recipeData) {
    $log.debug('recipeService.updateRecipe');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/recipe/${recipeID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, recipeData, config);
    })
    .then( res => {
      $log.log('recipes updated');
      for (let i = 0; i < service.recipes.length; i++) {
        let current = service.recipes[i];
        if (current._id === recipeID) {
          current = res.data;
          break;
        }
      }
      return res.data
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteRecipe = function(recipeID) {
    $log.debug('recipeService.deleteRecipe');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/recipe/${recipeID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('recipes deleted');
      for (let i = 0; i < service.recipes.length; i++) {
        let current = service.recipes[i];
        if (current._id === recipeID){
          service.galleries.splice(i, 1);
          break;
        }
      }
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
};
