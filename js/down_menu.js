function resize() {
	if ($("ul.drop_down > li").hasClass("opened")) {
		$("ul.drop_down > li").removeClass("opened");
	}
}

$(document).ready(function() {
		$("li.clinic").click(function() {
			$("li.clinic ~ li").toggleClass("opened");
		});

		$("li.patient").click(function() {
			$("li.patient ~ li").toggleClass("opened");
		});

		$("li.depart").click(function() {
			$("li.depart ~ li").toggleClass("opened");
		});
	return false;
	});
