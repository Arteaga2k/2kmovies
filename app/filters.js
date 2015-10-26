'use strict';

angular.module('myApp.movieFilters', [])

.filter('image', function(){
	return function(img, size) { http://image.tmdb.org/t/p/original
	
		if (size === 'original')
    		return img ? 'http://image.tmdb.org/t/p/original'+img : 'https://d3a8mw37cqal2z.cloudfront.net/assets/780d1a9b1e878090531fc7000c7a926e/images/no-backdrop-w500_and_h281_bestv2-v2.png';
		if (size === '780')
    		return img ? 'http://image.tmdb.org/t/p/w780'+img : 'https://d3a8mw37cqal2z.cloudfront.net/assets/780d1a9b1e878090531fc7000c7a926e/images/no-backdrop-w500_and_h281_bestv2-v2.png';
    	if (size === '300')
    		return img ? 'http://image.tmdb.org/t/p/w300'+img : 'https://assets.tmdb.org/assets/7f29bd8b3370c71dd379b0e8b570887c/images/no-poster-w185-v2.png';
    	if (size === '185')
    		return img ? 'http://image.tmdb.org/t/p/w185'+img : 'https://assets.tmdb.org/assets/7f29bd8b3370c71dd379b0e8b570887c/images/no-poster-w185-v2.png';
    	if (size === '92')
    		return img ? 'http://image.tmdb.org/t/p/w92'+img : 'http://dummyimage.com/92x134/969ca8/0e131f.png&text=image+not+available';
    	if (size === '45')
    		return img ? 'http://image.tmdb.org/t/p/w45'+img : 'https://assets.tmdb.org/assets/649ae87ebcf4285d2c45e94407adb382/images/no-profile-w45.jpg';
  };

})

.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<=total; i++)
      input.push(i);
    return input;
  };    
});

