$(document).ready(function() {
		$("footer > ul > li:first-child > span").click(function() {
			$("footer > ul > li:first-child > ul").toggleClass("opened");
		});

		$("footer > ul > li:nth-child(2) > span").click(function() {
			$("footer > ul > li:nth-child(2) > ul").toggleClass("opened");
		});

		$("footer > ul > li:nth-child(3) > span").click(function() {
			$("footer > ul > li:nth-child(3) > ul").toggleClass("opened");
		});
	return false;
	});
