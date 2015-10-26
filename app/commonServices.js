angular.module( 'myApp.movieServices', [
	'ngResource' 
	])


.constant('API_KEY', '772240083742ec78bf7c36ab4965222f')


/*myApp.factory('Movies', ['$resource',
	function($resource){

		var base = 'http://api.themoviedb.org/3';         
		var service = '/movie/upcoming';
		var apiKey = '772240083742ec78bf7c36ab4965222f';      
		var url = base + service + '?api_key=' + apiKey;

		return $resource(url, {}, {
			getJSONP: {
			 method: 'JSONP', 
			 params: {
			 	callback: 'JSON_CALLBACK'
			 }, 
			 isArray: true }
		});
}]);*/



.factory('Movies',['$resource','API_KEY', function($resource, API_KEY){
	//var apiKey = '772240083742ec78bf7c36ab4965222f';    
	return $resource('http://api.themoviedb.org/3/movie', {}, {		
		movieDetail: {
			url:'http://api.themoviedb.org/3/movie/:movieId',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,			
				callback: 'JSON_CALLBACK',
				append_to_response: 'trailers,similar,credits,images'
			},
			cache: true
		},
		movieCredits: {
			url:'http://api.themoviedb.org/3/movie/:movieId/credits',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				language: 'EN',		
				callback: 'JSON_CALLBACK'
			}
		},
		movieVideos: {
			url:'http://api.themoviedb.org/3/movie/:movieId/videos',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				language: 'EN',		
				callback: 'JSON_CALLBACK'
			}
		},
		movieReviews: {
			url:'http://api.themoviedb.org/3/movie/:movieId/reviews',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				language: 'EN',		
				callback: 'JSON_CALLBACK'
			}
		},
		movieImages: {
			url:'http://api.themoviedb.org/3/movie/:movieId/images',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,				
				callback: 'JSON_CALLBACK'
			},
			cache: true
		},
		movieKeywords: {
			url:'http://api.themoviedb.org/3/movie/:movieId/keywords',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				language: 'EN',		
				callback: 'JSON_CALLBACK'
			}
		},
		upcomingMovies: {
			url:'http://api.themoviedb.org/3/movie/upcoming',
			method: 'JSONP',			
			isArray: false,
			params: {
				api_key : API_KEY,
				language: 'EN',		
				page	: '@numPag',	
				callback: 'JSON_CALLBACK'
			}
		},
		topRatedMovies: {
			url:'http://api.themoviedb.org/3/movie/top_rated', 
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				page	: '@numPag',
				callback: 'JSON_CALLBACK'
			}
		},
		popularMovies: {
			url:'http://api.themoviedb.org/3/movie/popular',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				page	: '@numPag',
				callback: 'JSON_CALLBACK'
			}
		},
		nowplayingMovies: {
			url:'http://api.themoviedb.org/3/movie/now_playing',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				page	: '@numPag',
				callback: 'JSON_CALLBACK'
			}
		},
		similarMovies: {
			url:'http://api.themoviedb.org/3/movie/:movieId/similar',
			method: 'JSONP',
			isArray: false,
			params: {					
				api_key : API_KEY,		
				page	: '@numPag',		
				callback: 'JSON_CALLBACK'
				
			}
		},
		searchDb: {
			url:'http://api.themoviedb.org/3/search/movie',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				query 	: '@search',
				callback: 'JSON_CALLBACK'
			}
		}
	});
}])

.factory('Person',['$resource','API_KEY', function($resource, API_KEY){
	//var apiKey = '772240083742ec78bf7c36ab4965222f';    

	return $resource('http://api.themoviedb.org/3/person/popular', {}, {
		popularPeople: {
			method: 'JSONP',
			isArray: false,
			params: {
				api_key : API_KEY,
				language: 'EN',			
				callback: 'JSON_CALLBACK'
			}
		},
		personDetail: {
			url:'http://api.themoviedb.org/3/person/:personId',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				language: 'EN',		
				callback: 'JSON_CALLBACK'
			}
		},	
		personCredits: {
			url:'http://api.themoviedb.org/3/person/:personId/movie_credits',
			method: 'JSONP',
			isArray: false,
			params: {						
				api_key : API_KEY,
				language: 'EN',		
				callback: 'JSON_CALLBACK'
			}
		}			
	});
}]);





