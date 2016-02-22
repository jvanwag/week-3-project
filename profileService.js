angular.module('devMtIn')
.service('profileService', function($http) {
var baseUrl = "http://connections.devmounta.in/";
	this.saveProfile = function( profile ) {
		return $http({
      method: 'POST',
      url: baseUrl + 'api/profiles/',
      data: profile
    })
    .then(function(profileResponse) {
      localStorage.setItem('profileId', JSON.stringify({ profileId: profileResponse.data._id}));
    })
    .catch(function(err) {
      console.error("This is the error", err);
    })
	}

	this.checkForProfile = function(profileId) {
    return $http({
      method: 'GET',
      url: baseUrl + 'api/profiles/' + profileId
    });
	}

	this.deleteProfile = function() {
		var deleteId = JSON.parse(localStorage.getItem('profileId')).profileId;

    return $http({
      method: 'DELETE',
      url: baseUrl + 'api/profiles/' + deleteId
    });
	}

});

angular.module('devMtIn')
.service('friendService', function($http, $q){
	var baseUrl="http://connections.devmounta.in/";
	this.findFriends = function(userId, query) {
		return $http({
			method: 'GET',
			url: baseUrl + 'api/friends/' + userId + '?name=' + query
		})
		.then(function(response){
			console.log(response);
			return response.data;
		})
	}
	this.addFriend = function(userId, friendId) {
		return $http({
			method:'PUT',
			url: baseUrl + 'api/friends/' +userId,
			data: {friendId: friendId}
		})
	}
	this.removeFriend = function(userId, friendId) {
		return $http({
			method: 'PUT',
			url: baseUrl + 'api/friends/remove/' + userId,
			data: {friendId: friendId}
		})
	}
	this.findFriendsFriends= function(profile) {
		var index = 0;
		var deferred = $q.defer();
		function getNextFriend() {
			if (profile.friends[index]) {
				return $http({
					method:'GET',
					url: baseUrl + 'api/friends-friends/' + profile.friends[index]._id
				})
				.then(function(friends) {
					profile.frineds[index]. friends = friends.data;
					index++;
					getNextFriend();
				})
				.catch(function(err) {
					return console.error(err);
				})
			} else {
				deferred.resolve(profile);
				return deferred.promise;
			}
		}
		getNextFriend();
	}
})
