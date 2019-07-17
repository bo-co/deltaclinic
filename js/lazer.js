function resize() {
	if ($("div.compare").length !=0) {
			if (window.matchMedia('(max-width: 720px)').matches) {
				$("div.compare > div:last-of-type").css({"top" : $("div.compare > ol:first-of-type").outerHeight() + 10 + "px"});
		}
		else {
				$("div.compare > div:last-of-type").css({"top" : 0 + "px"});
		}
	}
}
