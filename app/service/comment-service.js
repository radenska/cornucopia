'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', commentService];

function commentService($q, $log, $window, $http, authService){
  $log.debug('commentService');

  let service = {};

  service.createComment = function(recipeData, commentData){
    $log.debug('service.createComment');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/comment/${recipeData._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, commentData, config);
    })
    .then( res => {
      $log.log('created a comment');
      return res.data;
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };


  service.fetchComment = function(commentID){
    $log.debug('service.fetchComment');

    let url = `${__API_URL__}/api/comment/${commentID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched one comment');
      return res.data;
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };


  service.fetchProfileComments = function(profileData){
    $log.debug('service.fetchProfileComments');

    let url = `${__API_URL__}/api/allcomments/${profileData._id}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched all profile comment');
      return res.data;
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  service.fetchRecipeComments = function(recipeData){
    $log.debug('service.fetchRecipeComments');


    let url = `${__API_URL__}/api/allrecipecomments/${recipeData._id}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched all the comments');
      return res.data;
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  service.deleteComment = function(comment){
    $log.debug('Service.deleteComment');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/comment/${comment._id}`;
      let config = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('deleted comment');
      return res.data;
    })
    .catch(err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  service.updateComment = function(commentID, comment){
    $log.debug('service.updateComment');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URI__}/api/comment/${commentID}`;
      let config = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, comment, config);
    })
    .then( res => {
      $log.log('updated comment');
      return res.data;
    })
    .catch(err => {
      $log.error(err);
      return $q.reject(err);
    });
  };


  return service;
}
