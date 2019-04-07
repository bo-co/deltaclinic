$(document).ready(function() {
	$('.scrollbar').scrollbar();
  	$('div.container > nav > div > div ul > li > a').on('click', function(e) {
  		$('div.menu div.content > div').html('');
  		$('div.container > nav > div > div ul > li > a').removeClass('selected');
  		if ($(this).next('div').length !== 0) {
  			$('div.container').addClass('nav');
  			$('div.menu').css({'display' : 'block'});
  			$('div.menu div.content > div').html($(this).next('div').html());
  			$(this).addClass('selected');
  			}
  		else {
  			$('div.container').removeClass('nav');
  			$('div.menu').css({'display' : 'none'});
  			$(this).removeClass('selected');
  			}
  		e.preventDefault();
  		});
	return false;
	});