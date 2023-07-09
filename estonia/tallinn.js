document.querySelector('.btn1').addEventListener('click', function() {
  let links1 = document.querySelector('.links-1');
  links1.innerHTML = '';

  tallinn()
      }) 
function tallinn(params) {

// Создаем кнопку "Сгенерировать пешеходный маршрут"
var walkingButton = document.createElement('button');
walkingButton.textContent = 'Сгенерировать пешеходный маршрут';
walkingButton.onclick = function() {
  generateRandomRoute('WALKING');
};
document.body.appendChild(walkingButton);

// Создаем кнопку "Сгенерировать автомобильный маршрут"
var drivingButton = document.createElement('button');
drivingButton.textContent = 'Сгенерировать автомобильный маршрут';
drivingButton.onclick = function() {
  generateRandomRoute('DRIVING');
};
document.body.appendChild(drivingButton);

// Создаем тег <div> с идентификатором "map"
var mapDiv = document.createElement('div');
mapDiv.id = 'map';
mapDiv.style.width = '100%';
mapDiv.style.height = '500px';
document.body.appendChild(mapDiv);
// Создаем массив с различными местами в городе Таллинн
const places = [
{ name: "Ратушная площадь", coordinates: { lat: 59.436962, lng: 24.753574 } },
{ name: "Таллиннский замок", coordinates: { lat: 59.437268, lng: 24.742599 } },
{ name: "Таллиннская старая гавань", coordinates: { lat: 59.443500, lng: 24.748238 } },
{ name: "Кадриоргский парк", coordinates: { lat: 59.431933, lng: 24.781541 } },
// Добавьте сюда другие места, которые вы хотите включить в маршрут
];

// Создаем объект карты
const map = new google.maps.Map(document.getElementById("map"), {
center: { lat: 59.4370, lng: 24.7536 }, // Координаты центра карты
zoom: 14, // Масштаб карты
});

// Функция для генерации случайного индекса
function getRandomIndex(max) {
return Math.floor(Math.random() * max);
}

// Функция для генерации случайного маршрута
function generateRandomRoute(transportationMode) {
const route = [];

// Генерируем случайные места в заданном количестве
const numberOfPlaces = getRandomIndex(4) + 2; // Генерируем от 2 до 5 мест
for (let i = 0; i < numberOfPlaces; i++) {
const randomPlace = places[getRandomIndex(places.length)];
route.push(randomPlace);
}

// Отображаем маршрут на карте
displayRouteOnMap(route, transportationMode);
}

// Функция для отображения маршрута на карте
function displayRouteOnMap(route, transportationMode) {
const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

const waypoints = route.map(place => ({
location: place.coordinates,
stopover: true,
}));

const travelMode = transportationMode === 'WALKING' ? "WALKING" : "DRIVING";

const request = {
origin: route[0].coordinates,
destination: route[route.length - 1].coordinates,
waypoints,
travelMode,
};

directionsService.route(request, function(result, status) {
if (status === "OK") {
  directionsDisplay.setDirections(result);
}
});
}

// Вызываем функцию для генерации и отображения случайного маршрута при загрузке страницы
generateRandomRoute('WALKING');
}
