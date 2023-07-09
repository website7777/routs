
let mapDiv;

// Функция для обработки клика на кнопку с классом "btn6"
// ... остальной код ...


// Функция для обработки клика на кнопку с классом "btn6"
document.querySelector('.btn7').addEventListener('click', function(event) {
  event.preventDefault(); // Предотвращаем обновление страницы
  let links1 = document.querySelector('.links-1');
  links1.innerHTML = '';

  maardu();
});

// Функция для отображения карты Viljandi
function maardu() {
  mapDiv = document.createElement('div');
  mapDiv.id = 'map';  
  mapDiv.style.width = '100%';
  mapDiv.style.height = '500px';
  document.body.appendChild(mapDiv);

  const parks = [
    { name: "Замок Вильянди", coordinates: { lat: 58.3614, lng: 25.5980 } },
    { name: "Озеро Вильянди", coordinates: { lat: 58.3639, lng: 25.5844 } },
    { name: "Парк Укуру", coordinates: { lat: 58.3670, lng: 25.5909 } },
    { name: "Ратуша Вильянди", coordinates: { lat: 58.3633, lng: 25.5981 } },
    { name: "Музей Маргариты", coordinates: { lat: 58.3604, lng: 25.5949 } }
];


createMap(59.4781, 25.0161, parks);
  generateRandomRoute(parks, 'WALKING');
}

// Функция для создания карты с заданными координатами
function createMap(latitude, longitude, places) {
  var walkingButton = document.createElement('button');
  walkingButton.textContent = 'Сгенерировать пешеходный маршрут';
  walkingButton.onclick = function() {
    generateRandomRoute(places, 'WALKING');
  };
  document.body.appendChild(walkingButton);

  var drivingButton = document.createElement('button');
  drivingButton.textContent = 'Сгенерировать автомобильный маршрут';
  drivingButton.onclick = function() {
    generateRandomRoute(places, 'DRIVING');
  };
  document.body.appendChild(drivingButton);

  var mapDiv = document.createElement('div');
  mapDiv.id = 'map';
  mapDiv.style.width = '100%';
  mapDiv.style.height = '500px';
  document.body.appendChild(mapDiv);

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 14
  });
}

// Функция для генерации случайного маршрута
function generateRandomRoute(places, transportationMode) {
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  const waypoints = places.map(place => ({
    location: place.coordinates,
    stopover: true,
  }));

  const travelMode = transportationMode === 'WALKING' ? "WALKING" : "DRIVING";

  const request = {
    origin: places[0].coordinates,
    destination: places[places.length - 1].coordinates,
    waypoints,
    travelMode,
  };

  directionsService.route(request, function(result, status) {
    if (status === "OK") {
      directionsDisplay.setDirections(result);
    }
  });
}
