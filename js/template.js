var myMap;
var routePanelControl;
var myPlacemark;
var multiRoutePromise;
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.74964123543684, 37.662869272700114],
        zoom: 15,
        controls: []
    	});
	myMap.controls.add("zoomControl", {
    	size: "small"
		});
	myPlacemark = new ymaps.Placemark([55.75164123543684, 37.662869272700114], {
		balloonContent: "«Дельтаклиник»<br />Москва, Наставнический перeулок, 6"
		}, {
    	iconLayout: "default#image",
    	iconImageHref: "img/finish.svg",
    	iconImageSize: [40, 40],
    	iconImageOffset: [-20, -20]
		});		
	myMap.geoObjects.add(myPlacemark);
	myMap.behaviors.disable("scrollZoom");	
    }
    
function map() {
	myMap.geoObjects.remove(myPlacemark);		
    routePanelControl = new ymaps.control.RoutePanel({
        options: {
            showHeader: true,
            title: "Маршруты",
            routePanelTypes: {
            	pedestrian: false,
            	masstransit: false,
            	bicycle: false,
            	auto: false,
            	taxi: false
            	},
            maxWidth: "260px",
            visible: false,
            float: "none",
            position: {
            	top : 20,
            	right : 20
            	}
       		}
    	});    	
    routePanelControl.routePanel.state.set({
    	type: "auto",
        to: [55.75164123543684, 37.662869272700114],
        toEnabled: false
    	});
	routePanelControl.routePanel.options.set({
    	allowSwitch: false,
        reverseGeocoding: true
    	});    	
    multiRoutePromise = routePanelControl.routePanel.getRouteAsync();    
    multiRoutePromise.then(function(multiRoute) {
    	multiRoute.options.set({
    		wayPointStartIconLayout: "default#image",
    		wayPointStartIconImageHref: "img/start.svg",
    		wayPointStartIconImageSize: [40, 40],
    		wayPointStartIconImageOffset: [-20, -20],
   			wayPointFinishIconLayout: "default#image",
    		wayPointFinishIconImageHref: "img/finish.svg",
    		wayPointFinishIconImageSize: [40, 40],
    		wayPointFinishIconImageOffset: [-20, -20]
  			})
    	});
	myMap.controls.add(routePanelControl);
	routePanelControl.routePanel.geolocate("from");
	}
	
$(document).ready(function() {
	$("div.container > footer > div.contacts > div > ul > li > a.route").on("click", function(e) {
		if(!routePanelControl) {
			map();
			}
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