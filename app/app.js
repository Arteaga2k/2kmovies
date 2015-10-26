'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.movies',
  'myApp.person',
  'myApp.version',
  'ui.router',
  'ngMaterial',
  'ngMdIcons',
  'myApp.movieFilters',
  'ngAnimate'

 

  ])

.config( function($stateProvider, $urlRouterProvider, $mdIconProvider, $sceDelegateProvider,$logProvider) {

  $logProvider.debugEnabled(true);
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/movies/top_rated");

  $mdIconProvider
  .iconSet('action', 'bower_components/angular-material/iconsets/action-icons.svg', 24)
  .iconSet('alert', 'bower_components/angular-material/iconsets/alert-icons.svg', 24)
  .iconSet('av', 'bower_components/angular-material/iconsets/av-icons.svg', 24)
  .iconSet('communication', 'bower_components/angular-material/iconsets/communication-icons.svg', 24)
  .iconSet('content', 'bower_components/angular-material/iconsets/content-icons.svg', 24)
  .iconSet('device', 'bower_components/angular-material/iconsets/device-icons.svg', 24)
  .iconSet('editor', 'bower_components/angular-material/iconsets/editor-icons.svg', 24)
  .iconSet('file', 'bower_components/angular-material/iconsets/file-icons.svg', 24)
  .iconSet('hardware', 'bower_components/angular-material/iconsets/hardware-icons.svg', 24)
  .iconSet('icons', 'bower_components/angular-material/iconsets/icons-icons.svg', 24)
  .iconSet('image', 'bower_components/angular-material/iconsets/image-icons.svg', 24)
  .iconSet('maps', 'bower_components/angular-material/iconsets/maps-icons.svg', 24)
  .iconSet('navigation', 'bower_components/angular-material/iconsets/navigation-icons.svg', 24)
  .iconSet('notification', 'bower_components/angular-material/iconsets/notification-icons.svg', 24)
  .iconSet('social', 'bower_components/angular-material/iconsets/social-icons.svg', 24)
  .iconSet('toggle', 'bower_components/angular-material/iconsets/toggle-icons.svg', 24)
  .iconSet('mdi', 'bower_components/angular-material/iconsets/mdi-icons.svg', 24)

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
    ]);

})


/*.directive('mdButton', function($log, $mdSidenav){
  return{
    restric: 'E',
    link: function(scope, element, attrs){
      element.on('click', function(){
        $mdSidenav('left').toggle()
        .then(function(){
         $log.debug("toggle LEFT is done");
           scope.$eval(attrs.action); //you could pass any method which you want to run
         })
      });
    }
  }
})*/

.directive('hmrating',function(){
  return {
        restrict: 'EA',
        scope: { 
            //@ reads the attribute value, = provides two-way binding, & works with functions
            hmupto:"@",
            hmid:"@",
            hmcolor:'@',
            rate:'=',
            setrating : '&', 
            mouseover : '&',
            mouseleave : '&'
        },
        templateUrl: 'templates/rating.html',
        link : function(scope,element,attr){
            scope.setrating(0);
        },       
        controller: function($scope){
    
            $scope.setrating = function(r){
                ratingEffect(r);
                $scope.rate = r;
            };
            
            $scope.mouseover = function(r){
                ratingEffect(r);
            }
            
            $scope.mouseleave = function(){
                ratingEffect($scope.rate);               
            }

            function ratingEffect(r){
                for(var i=0;i<=r;i++)
                    angular.element(document.querySelector("#"+$scope.hmid+i)).removeClass("fa-star-o"); 

                for(var i=0;i<=r;i++)
                    angular.element(document.querySelector("#"+$scope.hmid+i)).addClass("fa-star"); 

                for(var i=r+1;i<=$scope.hmupto;i++){
                    angular.element(document.querySelector("#"+$scope.hmid+i)).removeClass("fa-star"); 
                    angular.element(document.querySelector("#"+$scope.hmid+i)).addClass("fa-star-o"); 
                }
            }
        }
   };
});








