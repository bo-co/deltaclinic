function clear(elements) {
	elements.each(function() {
		if ($(this).val()) {
			$(this).val("");
			}
		if ($(this).next("span").hasClass("selected")) {
			$(this).next("span").removeClass("selected");
			}
		if ($(this).hasClass("error")) {
			$(this).removeClass("error");
			}
		if ($(this).hasClass("success")) {
			$(this).removeClass("success");
			}
		});
	return false;
	}
	
function isName(name) {
	var regex = new RegExp(/^([а-яА-Яa-zA-Z _.-]{3,30})+$/);
	return regex.test(name);
	}

function isEmail(email) {
	var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return regex.test(email);
	}
	
function isPhone(phone) {
	var regex = new RegExp(/^([0-9 )+(-]{18})+$/);
	return regex.test(phone);
	}
	
function isRequire(classname) {
	if ($("div.form." + classname + " .required > input").length !== $("div.form." + classname + " .required > input.success").length) {
		if ($("div.form." + classname + " > form > button").hasClass("active")) {
			$("div.form." + classname + " > form > button").removeClass("active");
			}
		}
	else {
		if (!$("div.form." + classname + " > form > button").hasClass("active")) {
			$("div.form." + classname + " > form > button").addClass("active");
			}
		}
	return false;
	}

$(document).ready(function() {
	$("a.callback").on("click", function(e) {
		$("div.callback").css("top", parseInt($(window).scrollTop()+20) + "px").toggleClass("opened");
		 e.preventDefault();
		});
	$("div.callback > button").on("click", function() {
		$("div.callback").removeClass("opened");
		});
	$(".field").on("propertychange change tap keyup input paste", function() {
		var element = this;
		setTimeout(function () {
			if (!$(element).val()) {
				if ($(element).next("span").hasClass("selected")) {
					$(element).next("span").removeClass("selected");
					}
				if ($(element).hasClass("error")) {
					$(element).removeClass("error");
					}
				if ($(element).hasClass("success")) {
					$(element).removeClass("success");
					}
				if ($(element).hasClass("selected")) {
					$(element).removeClass("selected");
					}
				}
			else {
				if (!$(element).next("span").hasClass("selected")) {
					$(element).next("span").addClass("selected");
					}
				if ($(element).parent().hasClass("required")) {
					if ($(element).attr("name") == "uname") {
						var result = isName($(element).val());
						}
					if ($(element).attr("name") == "uemail") {
						var result = isEmail($(element).val());
						}
					if ($(element).attr("name") == "uphone") {
						var result = isPhone($(element).val());
						}
					if (!result) {
						if ($(element).hasClass("success")) {
							$(element).removeClass("success");
							}
						$(element).addClass("error");
						}
					else {
						if ($(element).hasClass("error")) {
							$(element).removeClass("error");
							}
						$(element).addClass("success");
						}
					}
				else {
					if (!$(element).hasClass("selected")) {
						$(element).addClass("selected");
						}
					}
				isRequire($(element).data("form"));
				}
			}, 100);
		});
	$("div.form > form > button").on("click", function() {
		if ($(this).hasClass("active")) {
			/* $(this).parents("form").submit(); */
			$("div.form."+ $(this).data("form")).html("<span>Спасибо!</span><p>В ближайшее время с Вами свяжется наш специалист и ответит на все, интересующие Вас, вопросы.</p>");
			}
		});
	clear($(".field"));
	$("input[type=tel]").inputmask("+7 (999) 999-99-99");
	return false;
	});