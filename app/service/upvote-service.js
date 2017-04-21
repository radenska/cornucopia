'use strict';

module.exports = ['$q', '$log', '$http', 'authService', upvoteService];

function upvoteService($q, $log, $http, authService) {
  $log.debug('upvoteService');

  let service = {};
  service.upvotes = [];

  service.createUpvote = function(upvote, recipeID) {
    $log.debug('upvoteService.createUpvote');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/upvote/${recipeID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, upvote, config);
    })
    .then(res => {
      $log.log('upvote created');

      let upvote = res.data;
      service.upvotes.push(upvote);
      return upvote;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteUpvote = function(upvoteID) {
    $log.debug('upvoteService.deleteUpvote');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/upvote/${upvoteID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( () => {
      $log.log('upvote deleted');
      service.upvotes.some((upvote, index) => {
        if (upvote._id === upvoteID) {
          service.upvotes.splice(index, 1);
          return true;
        }
      });
    })
    .catch(err => {
      $log.err(err.message);
      return $q.reject(err);
    });
  };

  service.updateUpvote = function(upvoteID, upvoteData) {
    $log.debug('upvoteService.updateUpvote');

    authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/upvote/${upvoteID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
      
      return $http.put(url, upvoteData, config);
    })
    .then(res => {
      $log.log('upvote updated');
      service.upvotes.some((upvote, index) => {
        if (upvote._id === upvoteID) {
          service.upvotes[index] === res.data;
          return true;
        }
      });
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchUpvote = function(upvoteID) {
    $log.debug('upvoteService.fetchUpvote');

    let url = `${__API_URL__}/api/${upvoteID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };
    return $http.get(url, upvoteID, config)
    .then(res => {
      $log.log('upvote fetched');
      service.galleries.push(res.data);
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
