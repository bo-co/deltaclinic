var myMap;
var routePanelControl;
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.75164123543684, 37.662869272700114],
        zoom: 15,
        controls: []
    	});    	
    routePanelControl = new ymaps.control.RoutePanel({
        options: {
            showHeader: true,
            title: "Маршруты",
            routePanelTypes: {
            	pedestrian: true,
            	masstransit: false,
            	auto: false
            	},
            maxWidth: "280px",
            visible: false
       		}
    	});    	
    routePanelControl.routePanel.state.set({
    	type: "auto",
        to: "Москва, Наставнический пер., 6",
        toEnabled: false
    	});
	routePanelControl.routePanel.options.set({
    	allowSwitch: false,
        reverseGeocoding: true
    	});    	
    var multiRoutePromise = routePanelControl.routePanel.getRouteAsync();    
    multiRoutePromise.then(function(multiRoute) {
    	multiRoute.options.set({
    		wayPointStartIconLayout: "default#image",
    		wayPointStartIconImageHref: "img/start.svg",
    		wayPointStartIconImageSize: [50, 50],
    		wayPointStartIconImageOffset: [-25, -25],
   			wayPointFinishIconLayout: "default#image",
    		wayPointFinishIconImageHref: "img/finish.svg",
    		wayPointFinishIconImageSize: [50, 50],
    		wayPointFinishIconImageOffset: [-25, -25]
  			})
    	});
	myMap.controls.add(routePanelControl);
	}
	
$(document).ready(function() {
	$("div.container > footer > div.contacts > div > ul > li > a.route").on("click", function(e) {
		routePanelControl.routePanel.state.set({
			type: $(this).data("type")
			});			
		routePanelControl.options.set({
			title: $(this).data("title"),
			visible: true
			});
		e.preventDefault();
		});
	return false;
	});