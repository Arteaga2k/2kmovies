'use strict';

angular.module('myApp.person', [
	'ui.router',	
	'myApp.movieServices',
  'ngSanitize'

	])


.config( function($stateProvider, $urlRouterProvider) {
  //
  // Now set up the states
  $stateProvider

  
  .state('personDetail', {  
   url: "/person/{{personId}}/detail",   
   templateUrl: "person/person.detail.html",   
   controller: ['$scope', '$stateParams', 'Person',
   function (  $scope,   $stateParams,   Person) {    

     function toggleSidenav(name) {
      console.log('entra');
      $mdSidenav(name).toggle();

    }

    $scope.person = Person.personDetail({ personId: $stateParams.personId }); 
    $scope.credits = Person.personCredits({ personId: $stateParams.personId });
    console.log($scope.credits);

  }]
});  


})

.controller('PersonCtrl', ['$scope', '$routeParams','$stateParams', 'Person', function($scope, $routeParams, $stateParams, Person) {

  //console.log('la id de la pelicula es' + $stateParams.movieId);

  /*$scope.movie = Movies.movieDetail({ movieId: $stateParams.movieId });
  $scope.reviews = Movies.movieReviews({ movieId: $stateParams.movieId});
  $scope.credits = Movies.movieCredits({ movieId: $stateParams.movieId });
  //$scope.videos = Movies.movieVideos({ movieId: $stateParams.movieId });

  console.log($scope.movie); 
  console.log( $scope.credits); */



}]);


