'use strict';

function initMap() {
  var mapContainer = document.getElementById('map');
  var map = new google.maps.Map(mapContainer, {
    center: {lat: 59.9648316, lng: 30.3140869},
    scrollwheel: false,
    zoom: 16,
    disableDefaultUI: true,
  });
  var marker = new google.maps.Marker({
    position: {lat: 59.964909, lng: 30.313325},
    map: map
  });
}
