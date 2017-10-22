"use strict";
/**
 *
 */
var originCoord = '39.206035,-123.198814';
var originLat = 39.206035;
var originLong = -123.198814;
//Declares EventHandlers and begins the javascript
		

var object = JSON.parse('{"routes":{"north":{"wp1":{"lat":38.57511029999999,"long":-121.4972062},"wp2":{"lat":38.570092,"long":-121.4570827},"wp3":{"lat":38.7495839,"long":-121.284194}},"south":{"wp1":{"lat":38.57511029999999,"long":-121.4972062},"wp2":{"lat":38.541035,"long":-121.4779847},"wp3":{"lat":38.5159772,"long":-121.4713085},"wp4":{"lat":38.4091101,"long":-121.4521419},"wp5":{"lat":38.4156551,"long":-121.3908844}},"west":{"wp1":{"lat":38.57511029999999,"long":-121.4972062},"wp2":{"lat":38.676422,"long":-121.6377945},"wp3":{"lat":38.6785332,"long":-121.784633}},"east":{"wp1":{"lat":38.57511029999999,"long":-121.4972062},"wp2":{"lat":38.5474033,"long":-121.3746254},"wp3":{"lat":38.5615456,"long":-121.1969122}}}}')
window.onload = function(){
	//document.getElementById("submitbutton").addEventListener("click", run(directionsService, directionsDisplay);
	var  directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
	var map, infoWindow;
      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
		var src = 'http://google.org/crisismap/.kmlifyCalFires?url=https://www.google.com/maps/d/kml?mid=1TOEFA857tOVxtewW1DH6neG1Sm0&cm.cache_time=2513742&callback=_xdc_._596gaa&token=24281&cm.ttl=600';
						var kmlLayer = new google.maps.KmlLayer(src, {
						  suppressInfoWindows: true,
						  preserveViewport: false,
						  map: map
						});
						
        infoWindow = new google.maps.InfoWindow;
		
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: originLat,//position.coords.latitude,
              lng: originLong//position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Sacramento, CA');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
		}
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
	  run(directionsService,directionsDisplay)
};

function run(directionsService, directionsDisplay){
	console.log("run")
	var closestWaypoint = getClosestWaypoint(originLat,originLong,directionsService,directionsDisplay)
	console.log("closest: "+ closestWaypoint[0] + ", " + closestWaypoint[1])

	}

function getClosestWaypoint(lat,lon,directionsService,directionsDisplay){	
	var minDist = 10000000000;
	var key = []
	
	for (var direction in object['routes']){
			for(var waypoint in object['routes'][direction]){
				var latcurrent = object['routes'][direction][waypoint]['lat'];
				var loncurrent = object['routes'][direction][waypoint]['long'];
				var currdist = compareCoordinates(lat,lon,latcurrent,loncurrent);
				console.log(currdist);
				if( currdist < minDist){
					minDist = currdist;
					key = [direction,waypoint]
				}
			}
	}

	calculateAndDisplayRoute(key, directionsService, directionsDisplay);
	
	return key;
}

function calculateAndDisplayRoute(key, directionsService, directionsDisplay) {
		var waypts = []
        waypts = populateWaypoints(key);
		var dest = getDestination(key);
		console.log(dest)

        directionsService.route({
          origin: originCoord,
          destination: dest,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
			console.log("plotting route")
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
		directionsDisplay.setMap(map);
}

function compareCoordinates(lat1,lon1,lat2,lon2){
	return(Math.pow(lat2-lat1,2)+ Math.pow(lon2-lon1,2))
}

function populateWaypoints(key){
	var waypts = [];
	var lat = object['routes'][key[0]][key[1]]['lat'];
	var lon = object['routes'][key[0]][key[1]]['long'];
	var coord = lat + "," + lon;
	console.log("waypoint: " + coord)
	waypts.push({location: coord, stopover: true});
	
	return waypts;
}

function getDestination(key){
	//var indexLastwaypt = object['routes'][key[0]];
	//console.log(indexLastwaypt);
	//var lat = object['routes'][key[0]][(object['routes'][key[0]].length-1)]['lat'];
	//var lon = object['routes'][key[0]][(object['routes'][key[0]].length-1)]['long'];
	//var coord = lat + "," + lon;
	//console.log("Destination: " + coord)
	return '38.7495839,-121.284194';
}