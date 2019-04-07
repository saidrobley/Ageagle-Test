let key = '2f927376c97ec3dfb63cfa5fd838efe0';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FpZHJvYmxleSIsImEiOiJjanU0dzR5dDMxMmZ5NDRvNzk4aWxyZnY3In0.M_sGIWQz6BzjGVP88HA3Kw';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-105.2, 40.015], // starting position at Boulder, Co
  zoom: 7 // starting zoom
});

map.on('click', function(e) {
  let lat = e.lngLat.lat;
  let lng = e.lngLat.lng;

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${key}`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Bad HTTP');
      }
    })

    .then(jsonData => {
      let tempF = Math.round(convertToFahrenheit(jsonData.main.temp));
      let city = jsonData.name;
      let country = jsonData.sys.country;
      let message = `Temperature: ${tempF}° City: ${city}, Country: ${country}`;
      document.getElementById('info').innerHTML = message;
    })
    .catch(err => {
      console.log('Error:', err.message);
    });
});

function convertToFahrenheit(temp) {
  return (temp - 273.15) * (9 / 5) + 32;
}
