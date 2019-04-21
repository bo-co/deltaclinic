var main = null;

$(document).ready(function() {
	if (!main && $('div.container > article > div.swiper-main').length !== 0) {
		setTimeout(function() {
			main = new Swiper('div.container > article > div.swiper-main', {
				loop: true,
				autoplay: {
    				delay: 7000,
  					},
				slidesPerView: 1,
     			effect: 'fade',
     			fadeEffect: {
    				crossFade: true
  					},
				keyboard: {
    				enabled: true,
    				onlyInViewport: false
  					},
  				speed: 600,
  				preloadImages: true,
  				pagination: {
        			el: 'div.container > article > div.swiper-main > div',
        			clickable: true
      				}
				});
			}, 50);
		}		
	return false;
	});