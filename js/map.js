ymaps.ready(init);

function init() {
	
	var routePanelControl,
		multiRoutePromise,
		myPlacemark = new ymaps.Placemark([55.75164123543684, 37.662869272700114], {
		balloonContent: "«Дельтаклиник»<br />Москва, Наставнический перeулок, 6"
		}, {
    	iconLayout: "default#image",
    	iconImageHref: "img/finish.svg",
    	iconImageSize: [40, 40],
    	iconImageOffset: [-20, -20]
		});
		
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
        	to: "Наставнический перeулок, 6",
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
		
    myMap = new ymaps.Map('map', {
        center: [55.74964123543684, 37.662869272700114],
        zoom: 15,
        controls: []
    	}),
    ZoomLayout = ymaps.templateLayoutFactory.createClass('<div class="zoom"><div class="in" id="in"></div><div class="out" id="out"></div></div>', {
        build: function () {
        	ZoomLayout.superclass.build.call(this);
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
            $('#in').bind('click', this.zoomInCallback);
            $('#out').bind('click', this.zoomOutCallback);
            },
        clear: function () {
            $('#in').unbind('click', this.zoomInCallback);
            $('#out').unbind('click', this.zoomOutCallback);
            ZoomLayout.superclass.clear.call(this);
            },
        zoomIn: function () {
            var map = this.getData().control.getMap();
            this.events.fire('zoomchange', {
                oldZoom: map.getZoom(),
                newZoom: map.getZoom() + 1
                });
            },
        zoomOut: function () {
            var map = this.getData().control.getMap();
            this.events.fire('zoomchange', {
                oldZoom: map.getZoom(),
                newZoom: map.getZoom() - 1
                });
            }
        }),
    zoomControl = new ymaps.control.ZoomControl({
    	options: {
    		layout: ZoomLayout
    		}
    	});
    myMap.controls.add(zoomControl);
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);

	$("div.container > footer > div.contacts > div > ul > li > a.route").on("click", function(e) {
		myMap.geoObjects.remove(myPlacemark);		
    	routePanelControl = new ymaps.control.RoutePanel({
        	options: {
            	showHeader: true,
            	title: $(this).data("title"),
            	routePanelTypes: {
            		pedestrian: false,
            		masstransit: false,
            		bicycle: false,
            		auto: false,
            		taxi: false
            		},
            	maxWidth: "260px",
            	visible: true,
            	float: "none",
            	position: {
            		top : 20,
            		right : 20
            		}
       			}
    		});
		routePanelControl.routePanel.geolocate("from");    	
    	routePanelControl.routePanel.state.set({
    		type: $(this).data("type"),
        	to: "Наставнический перeулок, 6",
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
		setTimeout(function() {
			$(".ymaps-2-1-72-route-panel-input__icon_first .ymaps-2-1-72-route-panel-input__circle").css("fill", "rgb(1, 31, 88)");	
			$(".ymaps-2-1-72-route-panel-input__icon_last .ymaps-2-1-72-route-panel-input__circle").css("fill", "rgb(244, 86, 65)");
			}, 100);
		e.preventDefault();
		});
		
	$(document).mouseup(function(e) {
		if(!$("div#map").is(e.target) && $("div#map").has(e.target).length === 0 && $("div#map").is(":visible")) {
			if(routePanelControl) {
				myMap.controls.remove(routePanelControl);
				}
			}
    	e.preventDefault();
		});
    }