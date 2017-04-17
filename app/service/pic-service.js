'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadProfilePic = function(profileData, picData) {
    $log.debug('service.uploadProfilePic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${userID}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          file: picData.file
        }
      });
    })
    .then( res => {
      profileData.pic.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteProfilePic = function(profileData, picData) {
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${userID}/${picData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('Profile pic deleted.');
    })
    .catch( err => {
      $log.err(err.message);

      return $q.reject(err);
    });
  };

  service.uploadRecipePic = function(recipeData, picData) {
    $log.debug('service.uploadRecipePic')
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/recipe/${recipeData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'appliaction/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          file: picData.file
        }
      });
    })
    .then( res => {
      $log.log('RESPONSE:', res)
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteRecipePic = function(recipeData, picData) {
    $log.debug('picService.deleteRecipePic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/recipe/${recipe._id}/${picData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('Recipe pic deleted.');

    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
};
