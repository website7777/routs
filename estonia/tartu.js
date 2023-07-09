document.querySelector('.btn2').addEventListener('click', function() {
    let links1 = document.querySelector('.links-1');
    links1.innerHTML = '';
  
    tartu()
        }) 
  function tartu() {


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
    // Создаем массив с различными местами в городе Тарту
const places = [
    { name: "Ратушная площадь", coordinates: { lat: 58.378171, lng: 26.723480 } },
    { name: "Тартуский университет", coordinates: { lat: 58.381246, lng: 26.725267 } },
    { name: "Амберский музей", coordinates: { lat: 58.379992, lng: 26.714963 } },
    { name: "Эстонская национальная музыкальная академия", coordinates: { lat: 58.380762, lng: 26.723839 } },
    // Добавьте сюда другие места, которые вы хотите включить в маршрут
  ];
  
  // Создаем объект карты
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 58.3782, lng: 26.7294 }, // Координаты центра карты
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