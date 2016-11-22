var mapLoaded = false;
var dataLoaded = false;
var data;

function onMapLoad() {
    mapLoaded = true;
    if (dataLoaded)
        build();
}

function onDataLoad() {
    dataLoaded = true;
    data = JSON.parse(this.responseText);
    if (mapLoaded)
        build();
}

var dataReq = new XMLHttpRequest();
dataReq.addEventListener('load', onDataLoad);
dataReq.open("GET", "network.json");
dataReq.send();

function build() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng({ lat: 0, lng: 0 }),
        zoom: 2
    });
    data.forEach(function(location) {
        var marker = new google.maps.Marker({
            position: {
                lat: location.lat,
                lng: location.lng
            },
            map: map,
            title: location.servers.join(', ')
        });
    });
}