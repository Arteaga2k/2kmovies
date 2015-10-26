'use strict';

angular.module('myApp.movies', [
  'myApp',
  'ui.router',	  
  'myApp.movieServices',
  'ngStorage',
  'ngAnimate',  
   '720kb.socialshare',
   'youtube-embed'
   

  ])


.config( function($stateProvider, $urlRouterProvider) {
  //
  // Now set up the states
  $stateProvider

  .state('movies', {
   abstract: true,
   url: "/movies",
   templateUrl: "movies/movies.html",
   controller: 'MoviesCtrl'
 }) 

  .state('movies.upcoming', {
    url: "/upcoming",
    templateUrl: 'movies/movies.list.html',
    controller: ['$scope', '$stateParams', 'Movies', '$rootScope',
    function (  $scope,   $stateParams,   Movies, $rootScope) {     
      $scope.title = 'Upcoming Movies';   
      $scope.orderFilter = '-vote_average';  
      $scope.loadingContent(true);   
      $scope.numPage = 1;
      $scope.setMenuActive('upcoming');    

      getMovies();

      $scope.nextPage = function()  {
        $scope.numPage =  $scope.numPage +1; 
        $scope.loadingContent(true); 
        getMovies();
        
      }

      $scope.previousPage = function()  {
        $scope.numPage =  $scope.numPage - 1;
        $scope.loadingContent(true); 
        getMovies();
      }

      function getMovies() {
       Movies.upcomingMovies({page: $scope.numPage},function (data) {
        console.log('SUCCESS');
        $scope.movies = data;
        $scope.loadingContent(false);
        $rootScope.totalResults = data.total_results;

      }, function () {
        console.log('FAILURE');
      });   
     }   

   }]
 })

.state('movies.popular', {
  url: '/popular',
  templateUrl: 'movies/movies.list.html',
  controller: ['$scope', '$stateParams', 'Movies', '$rootScope',
  function (  $scope,   $stateParams,   Movies, $rootScope) {     
    $scope.title = 'Popular Movies';   
    $scope.orderFilter = '-vote_average';          
    $scope.loadingContent(true);   
    $scope.numPage = 1;
    $scope.setMenuActive('popular');

    getMovies();

    $scope.nextPage = function()  {
      $scope.numPage =  $scope.numPage +1; 
      $scope.loadingContent(true); 
      getMovies();

    }

    $scope.previousPage = function()  {
      $scope.numPage =  $scope.numPage - 1;
      $scope.loadingContent(true); 
      getMovies();
    }

    function getMovies() {
     Movies.popularMovies({page: $scope.numPage},function (data) {
      console.log('SUCCESS');
      $scope.movies = data;
      $scope.loadingContent(false);
      $rootScope.totalResults = data.total_results;

    }, function () {
      console.log('FAILURE');
    });   
   }   

 }]
})

.state('movies.top_rated', {
  url: '/top_rated',
  templateUrl: 'movies/movies.list.html',
  controller: ['$scope', '$stateParams', 'Movies','$rootScope',
  function (  $scope,   $stateParams,   Movies, $rootScope) {   
    $scope.title = 'Top Rated Movies';   
    $scope.orderFilter = '-vote_average';   
    $scope.loadingContent(true);   
    $scope.numPage = 1;
    $scope.setMenuActive('top_rated');

    getMovies();

    $scope.nextPage = function()  {
      $scope.numPage =  $scope.numPage +1; 
      $scope.loadingContent(true); 
      getMovies();

    }

    $scope.previousPage = function()  {
      $scope.numPage =  $scope.numPage - 1;
      $scope.loadingContent(true); 
      getMovies();
    }

    function getMovies() {
     Movies.topRatedMovies({page: $scope.numPage},function (data) {
      console.log('SUCCESS');
      $scope.movies = data;
      $scope.loadingContent(false);
      $rootScope.totalResults = data.total_results;

     

    }, function () {
      console.log('FAILURE');
    });   
   }   

 }]
})

.state('movies.now_playing', {
  url: '/now_playing',
  templateUrl: 'movies/movies.list.html',
  parent: 'movies',
  controller: ['$scope', '$stateParams', 'Movies','$rootScope',
  function (  $scope,   $stateParams,   Movies, $rootScope) {   
    $scope.title = 'Now playing Movies';   
    $scope.orderFilter = 'release_date';                
    $scope.loadingContent(true);    
    $scope.numPage = 1;
    $scope.setMenuActive('now_playing');

    getMovies();

    $scope.nextPage = function()  {
      $scope.numPage =  $scope.numPage +1; 
      $scope.loadingContent(true); 
      getMovies();

    }

    $scope.previousPage = function()  {
      $scope.numPage =  $scope.numPage - 1;
      $scope.loadingContent(true); 
      getMovies();
    }

    function getMovies() {
     Movies.nowplayingMovies({page: $scope.numPage},function (data) {
      console.log('SUCCESS');
      $scope.movies = data;
      $scope.loadingContent(false);
      $rootScope.totalResults = data.total_results;


      //console.log(data);

    }, function () {
      console.log('FAILURE');
    });   
   }      

 }]
})

.state('detail', {  
 url: "/movie/{{movieId}}/detail/",
 templateUrl: "movies/movie.detail1.html",
 controller: 'DetailCtrl'
})

.state('cast', {  
 url: "/movie/{{movieId}}/cast",   
 templateUrl: "movies/movie.detail.cast.html",
 controller: ['$scope', '$stateParams', 'Movies',
 function (  $scope,   $stateParams,   Movies) {  
  $scope.movie = Movies.movieDetail({ movieId: $stateParams.movieId });
  $scope.credits = Movies.movieCredits({ movieId: $stateParams.movieId });
}]
})
.state('similar', {  
 url: "/movie/{{movieId}}/similar",   
 templateUrl: "movies/movie.detail.similar.html",
 controller: ['$scope', '$stateParams', 'Movies',
 function (  $scope,   $stateParams,   Movies) {  

  $scope.numPage = 1;
  $scope.movie = Movies.movieDetail({ movieId: $stateParams.movieId });
  similarMovies($scope.numPage);


  function similarMovies() {
   $scope.similar = Movies.similarMovies({ movieId: $stateParams.movieId} , {numPag: $scope.numPage});
 }

 $scope.nextPage = function()  {
  $scope.numPage =  $scope.numPage +1;
  $scope.similar = Movies.similarMovies({ movieId: $stateParams.movieId} , {numPag: $scope.numPage});
}

$scope.previousPage = function()  {
  $scope.numPage =  $scope.numPage - 1;
  $scope.similar = Movies.similarMovies({ movieId: $stateParams.movieId} , {numPag: $scope.numPage});
}


}]
})
.state('favourites', {  
 url: "/movie/favourites",   
 templateUrl: "movies/movie.favourites.html",
 controller: ['$scope', '$stateParams', 'Movies', '$rootScope', '$localStorage',
 function (  $scope,   $stateParams,   Movies, $rootScope, $localStorage) {  
  $scope.setMenuActive('favourites');
  $scope.loadFavourites(); 
  $rootScope.totalResults = $localStorage.favourites.length;

  //console.log('favourites', )
}]
})
;



})


.controller('MoviesCtrl', ['$scope', '$mdSidenav', '$routeParams','$stateParams','Movies','$log','$state','$rootScope','$localStorage','$mdToast', function($scope, $mdSidenav, $routeParams,$stateParams, Movies, $log, $state, $rootScope, $localStorage, $mdToast) {

  $scope.mode = 1;
  $scope.numPage = 1;
  

  $scope.menuOptions = [
  {title:'Top Rated', ref:'movies.top_rated', icon: 'mdi:star', class: 'top_rated'},
  {title:'Popular', ref:'movies.popular', icon: 'mdi:trending-up', class: 'popular'},
  {title:'Upcoming', ref:'movies.upcoming', icon: 'av:new_releases', class: 'upcoming'},
  {title:'Now Playing', ref:'movies.now_playing', icon: 'av:movie', class: 'now_playing'},  
  {title:'Favourites', ref:'favourites', icon: 'mdi:heart', class: 'favourites'},
  ];

  

  $scope.saveFavourite = function(movieId, moviePosterPath, movieTitle, movieReleaseDate) {  
   //$localStorage.$reset();

    var movie = { id: movieId, poster: moviePosterPath, title: movieTitle, date: movieReleaseDate };
    var favs = $localStorage.favourites;   

    if (favs == null) {      
      favs = [];     
    }
    $log.debug('favs', favs);
    $scope.isFaved(movieId);   

    if (!$scope.faved) {
      favs.push(movie);   
      $localStorage.favourites = favs;   

       $log.debug($localStorage.favourites) ;

      $scope.faved = true;
      $mdToast.show(
        $mdToast.simple()
        .content('Faved!')
        .position('top right')
        .hideDelay(1000)
        );
    
    } else {
      var index = $scope.getIndexOf(movieId); 
      $localStorage.favourites.splice(index,1);
      $rootScope.totalResults =   $localStorage.favourites.length;
      $scope.faved = false;

      $mdToast.show(
        $mdToast.simple()
        .content('Deleted!')
        .position('top right')
        .hideDelay(1000)
        );
    }    
  }

  $scope.loadFavourites = function() {
    $scope.favourites = $localStorage.favourites;      
  }

  $scope.isFaved = function(movieId) { 

    $log.debug('entro en isFaved');

    if ($localStorage.favourites!= null) {
      for (var i = 0; i < $localStorage.favourites.length; i++) {
        if ($localStorage.favourites[i].id == movieId) {
         $log.debug('FAVED A  TRUE');
          $scope.faved = true;
          return;
       }
     }
   }
   $log.debug('FAVED A FALSE');
   $scope.faved = false;

 }  

 $scope.getIndexOf = function(movieId){

  for (var i = 0; i < $localStorage.favourites.length; i++) {  
    if ($localStorage.favourites[i].id === movieId) {   
      return i;
    }
  };
 
  return null;
}

 $scope.close = function () {
      $mdSidenav('left').close()  
}


$scope.toggleSidenav = function(name) { 
  $mdSidenav(name).toggle();
}

$scope.loadingContent = function(variable) {
  $rootScope.loading = variable;
}

$scope.setMenuActive = function(variable) {
  $rootScope.menu = variable; 
}

var self = this;


self.simulateQuery = false;
self.isDisabled    = false;

self.selectedItemChange = selectedItemChange;
self.searchTextChange   = searchTextChange;

    // ******************************
    // Internal methods
    // ******************************

    this.querySearch = function(search){

      //console.log('la longitud es', search.length);

      if (search != null && search.length > 0){
        return Movies.searchDb({ query: search}).$promise.then(function (data) {
          var geoArr = [];
         //console.log(res.results);
         angular.forEach(data.results,function(value, index){    
          geoArr.push({
            'id': value.id,
            'display': value.title,
            'backdrop': value.backdrop_path,
            'date': value.release_date
          })
        });

         //console.log(geoArr);
         return geoArr;                  
       });  
      }

    }

    
    function searchTextChange(text) {     
      $log.debug('searchTextChange', text);   
    }

    function selectedItemChange(item) {
    // console.log('selectedItemChange', item);

    if (typeof item !== 'undefined')
      $state.go('detail',  { movieId: item.id });      
  }

  $scope.movieTabsItems = [
  {text: 'popular', state: 'movies.popular'},
  {text: 'Upcoming', state: 'movies.upcoming'},
  {text: 'Top rated', state: 'movies.top_rated'},
  {text: 'Now playing', state: 'movies.now_playing'}
  ];
}])




.controller('DetailCtrl', ['$scope', '$routeParams','$stateParams', 'Movies','$mdDialog','$window','$rootScope','$mdMedia',  function($scope, $routeParams, $stateParams, Movies, $mdDialog, $window, $rootScope, $mdMedia) {

	
  $scope.loadingContent(true);    
  $scope.numPage = 1; 
  $rootScope.faved = false; 
  getMovie();

  // watch for mdMedia service
  $scope.$watch(
    // This function returns the value being watched. It is called for each turn of the $digest loop
    function() { return $mdMedia('sm'); },
    // This is the change listener, called when the value returned from the above function changes
    function( value) {
        $scope.mobileScreen = value;
        console.log('tamaño', value );
    }
  );  
  

  $scope.nextPage = function()  {
    $scope.numPage =  $scope.numPage +1; 
    $scope.loadingContent(true); 
    getMovie();

  }

  $scope.previousPage = function()  {
    $scope.numPage =  $scope.numPage - 1;
    $scope.loadingContent(true); 
    getMovie();
  }

  function getMovie() {
   Movies.movieDetail({movieId: $stateParams.movieId},function (data) {

    $scope.movie = data;   
    $scope.loadingContent(false);   
    $scope.loadFavourites();

    $scope.isFaved($stateParams.movieId);

  }, function () {
   $log.debug('FAILURE');   
 });   
 }    

 $scope.showRawImage = function(url) {
  $window.open('https://image.tmdb.org/t/p/original'+url+'');
};

$scope.showAdvanced = function(ev, title) {
 
  $mdDialog.show({
    controller: 'DialogController',
    templateUrl: 'movies/video.tmpl.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true
  })    
};

}])

.controller('DialogController', ['$scope','$stateParams', 'Movies','$mdDialog', function($scope, $stateParams, Movies, $mdDialog) {

  //console.log('la id de la pelicula es' + $stateParams.movieId); 
   Movies.movieVideos({ movieId: $stateParams.movieId},function (data) {
      console.log('SUCCESS');
      $scope.videos = data;  

    if ($scope.videos.results.length == 0) {
      $scope.noTrailer = true;
    }

    }, function () {
      console.log('FAILURE');
    });  
 
  
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.getIframeSrc = function (videoId) {
    return 'https://www.youtube.com/embed/' + videoId;
  };


  

}]);










