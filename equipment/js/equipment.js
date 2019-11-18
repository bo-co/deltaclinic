var isEquipment = null;

$(document).ready(function() {
	if (!isEquipment && $('article > div.equipment > ul > li > ul > li > div > div.swiper-equipment').length !== 0) {
		setTimeout(function() {
			isEquipment = new Swiper('article > div.equipment > ul > li > ul > li > div > div.swiper-equipment', {
				loop: true,
				slidesPerView: 1,
  				speed: 600,
  				preloadImages: true,
      			navigation: {
        			nextEl: 'article > div.equipment > ul > li > ul > li > div > div.swiper-equipment > div.swiper-controls > span.next',
        			prevEl: 'article > div.equipment > ul > li > ul > li > div > div.swiper-equipment > div.swiper-controls > span.prev'
      				},
  				pagination: {
        			el: 'article > div.equipment > ul > li > ul > li > div > div.swiper-equipment > div.swiper-pagination',
        			clickable: true
      				},
				preloadImages: false,
				lazy: true,
				watchSlidesVisibility: true
				});
			}, 50);
		}		
	return false;
	});