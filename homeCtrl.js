angular.module('devMtIn')
.controller('homeCtrl', function( $scope ) {

	$scope.myProfile = {
		friends: [{name: 'Ryan'}, {name: 'Bryan'}, {name: 'Sarah'}, {name: 'Zac'}, {name: 'Erin'}]
	}

	$scope.sortOptions = [{
		  display: 'Ascending'
		, value: false
	},
	{
		  display: 'Descending'
		, value: true
	}
	];
});
