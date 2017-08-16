
console.log('works');

// var locations = [
//   {lat: -31.563910, lng: 147.154312}
// ];

// function reqListener () {
//   const data = JSON.parse(this.responseText);
//   data.forEach(function(station) {
//     const latlng = station.latlng.split(",");
//     // console.log(latlng[0]);
//     // console.log(latlng[1]);
//
//     const lat = latlng[0];
//     const lng = latlng[1];
//     // console.log('lat: ' + lat + ' lng: ' + lng);
//     // const latandlng = {lat: lat, lng: lng};
//
//     locations.push({lat: parseFloat(lat), lng: parseFloat(lng)});
//     // console.log(locations);
//
//
//
//   });
// }

// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", "http://fixmystuff.nl/gas/data.json");
// oReq.send();

// init();

var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1],
    ];


    function reqListener () {
      const data = JSON.parse(this.responseText);

      const GPL = data.filter(function (el) {
        return el.carburants === 'E10|Gazole|SP98|GPLc';
      });

      console.log(GPL);

      GPL.forEach(function(station) {
        const latlng = station.latlng.split(",");
        // console.log(latlng[0]);
        // console.log(latlng[1]);
      //
        const lat = latlng[0];
        const lng = latlng[1];
        const id  = station.id;
        const adress  = station.adresse;
        const dayClosed  = station.saufjour;

        // console.log('lat: ' + lat + ' lng: ' + lng);
        // const latandlng = {lat: lat, lng: lng};

        // locations.push({lat: parseFloat(lat), lng: parseFloat(lng)});
        locations.push([adress, parseFloat(lat), parseFloat(lng), id, dayClosed]);

      });

        for (i = 0; i < locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0] + ' Gesloten op: ' + locations[i][4]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://pierman1.github.io/gas-france-api/api/data.json");
    oReq.send();

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(45.74846, 4.84671),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
