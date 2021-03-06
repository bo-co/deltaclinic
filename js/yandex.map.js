function init() {

	var userCoodinates = null,
		myPlacemark = new ymaps.Placemark([55.751486, 37.663129], {
			balloonContent: null,
			hintContent: null
			}, {
    		iconLayout: 'default#image',
    		iconImageHref: 'img/finish.svg',
    		iconImageSize: [40, 40],
    		iconImageOffset: [-20, -20]
			}),
		otherPlacemark = new ymaps.Placemark([55.752596, 37.662201], {
			balloonContent: null,
			hintContent: null
			}, {
    		iconLayout: 'default#image',
    		iconImageHref: 'img/finish.svg',
    		iconImageSize: [40, 40],
    		iconImageOffset: [-20, -20]
			}),
		multiRouteModel = new ymaps.multiRouter.MultiRouteModel([], {
            wayPointDraggable: false,
            boundsAutoApply: false
        	}),
        routeTypeSelector = new ymaps.control.ListBox({
            data: {
                content: 'Как добраться'
            	},
            items: [
                new ymaps.control.ListBoxItem({data: {content: 'Авто'}}),
                new ymaps.control.ListBoxItem({data: {content: 'Пешком'}})
            	],
            options: {
                itemSelectOnClick: false,
                float: 'none',
            	position: {
            		top : 20,
            		right : 20
            		},
            	visible: false
            	}
        	}),
        autoRouteItem = routeTypeSelector.get(0),
        pedestrianRouteItem = routeTypeSelector.get(1);        
    	autoRouteItem.events.add('click', function(e) { changeRoutingMode('auto', e.get('target')); });
    	pedestrianRouteItem.events.add('click', function(e) { changeRoutingMode('pedestrian', e.get('target')); });
		
    myMap = new ymaps.Map('map', {
        center: [55.751819, 37.662773],
        zoom: 17,
        controls: [routeTypeSelector]
    	}, {
        buttonMaxWidth: 300
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
    	}),
    multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel, {
        wayPointDraggable: false,
        boundsAutoApply: false
        });
    myMap.controls.add(zoomControl);
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);
    myMap.geoObjects.add(otherPlacemark);
    
	multiRoute.options.set({
		wayPointStartIconLayout: 'default#image',
		wayPointStartIconImageHref: 'img/start.svg',
    	wayPointStartIconImageSize: [40, 40],
    	wayPointStartIconImageOffset: [-20, -20],
   		wayPointFinishIconLayout: 'default#image',
    	wayPointFinishIconImageHref: 'img/finish.svg',
    	wayPointFinishIconImageSize: [40, 40],
    	wayPointFinishIconImageOffset: [-20, -20]
  		});
    
	ymaps.geolocation.get({
		provider: 'auto',
		autoReverseGeocode: false,
		mapStateAutoApply: true
		}).then(function (result) {
		userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();
		multiRouteModel.setReferencePoints([userCoodinates, '55.751486, 37.663129']);
		});
    
    function changeRoutingMode(routingMode, targetItem) {
    	if (myPlacemark) {
    		myMap.geoObjects.remove(myPlacemark);
    		}
    	if (otherPlacemark) {
    		myMap.geoObjects.remove(otherPlacemark);
    		}
    	if (routingMode) {
        	multiRouteModel.setParams({ routingMode: routingMode }, true);
        	}
        if (targetItem) {
        	autoRouteItem.deselect();
        	pedestrianRouteItem.deselect();
        	targetItem.select();
        	}
        routeTypeSelector.collapse();
        myMap.geoObjects.add(multiRoute);
        myMap.setBounds(multiRoute.getBounds());
    	}

	$('div.container > footer > div.contacts > div > ul > li > a.route').on('click', function(e) {
		if ($(this).data('type') === 'pedestrian') {
			changeRoutingMode($(this).data('type'), pedestrianRouteItem);
			}
		else {
			changeRoutingMode($(this).data('type'), autoRouteItem);
			}
		if ($('div.container > footer > div.contacts > div > div.route > input[name="from"]').val()) {
			multiRouteModel.setReferencePoints([$('div.container > footer > div.contacts > div > div.route > input[name="from"]').val(), $(this).data('location')]);
			}
		else {
			multiRouteModel.setReferencePoints([userCoodinates, $(this).data('location')]);
			}
		$('div.container > footer > div.contacts > div > div.route > input[name="to"]').val($(this).data('location'));
		$('div.container > footer > div.contacts > div > div.route > button').removeClass();
		$('div.container > footer > div.contacts > div > div.route > button').addClass($(this).data('type'));
		$('div.container > footer > div.contacts > div > div.route').css('display', 'block');
		$('html, body').stop().animate({
			scrollTop: $('footer > div.contacts').offset().top
			}, 1000);
		e.preventDefault();
		});
		
	$('div.container > footer > div.contacts > div > div.route > button').on('click', function() {
		multiRouteModel.setReferencePoints([$('div.container > footer > div.contacts > div > div.route > input[name="from"]').val(), $('div.container > footer > div.contacts > div > div.route > input[name="to"]').val()]);
		setTimeout(function () {
			if ($(this).hasClass('pedestrian')) {
				changeRoutingMode('pedestrian', pedestrianRouteItem);
				}
			else {
				changeRoutingMode('auto', autoRouteItem);
				}
			}, 600);
		
		});
	
    }
    
ymaps.ready(init);