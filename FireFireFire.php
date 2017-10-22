
<!DOCTYPE html>
<html lang="en">
<head>
  <title>StopDropDrive</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">--->
  <link rel="stylesheet" href="clearoutecss.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>--->
</head>
<body>
<div id="header">
	<h1 id="logoName">CLEAROUTE<?php echo "hello";?></h1>
</div>
<h3></h3>
    <div id="map"></div>
    <script>
      function initMap() {
        var uluru = {lat: 34.11, lng: -118.41};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
		var src = 'http://google.org/crisismap/.kmlifyCalFires?url=https://www.google.com/maps/d/kml?mid=1TOEFA857tOVxtewW1DH6neG1Sm0&cm.cache_time=2513742&callback=_xdc_._596gaa&token=24281&cm.ttl=600';
		var kmlLayer = new google.maps.KmlLayer(src, {
		  suppressInfoWindows: true,
		  preserveViewport: false,
		  map: map
		});
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYTRFRDwAvtAKisssQeV14vFxq5Sk5Dw8&callback=initMap">
    </script>

</body>
</html>
