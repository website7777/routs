document.querySelector('.btn5').addEventListener('click', function() {
    let links1 = document.querySelector('.links-1');
    links1.innerHTML = '';
  
    kohtlaJarve();
  });
  
  function kohtlaJarve() {
    // Создаем тег <div> с идентификатором "map"
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '500px';
    document.body.appendChild(mapDiv);
  
    const places = [
      { name: "Кохтла-Ярве музей", coordinates: { lat: 59.3948, lng: 27.2818 } },
      { name: "Технологический музей", coordinates: { lat: 59.3992, lng: 27.2738 } },
      { name: "Кохтла-Ярве парк", coordinates: { lat: 59.3974, lng: 27.2886 } },
      { name: "Кохтла-Ярве ратуша", coordinates: { lat: 59.3999, lng: 27.2856 } },
      { name: "Кохтла-Ярве культурный центр", coordinates: { lat: 59.3980, lng: 27.2784 } }
    ];
  
    // Создаем объект карты
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 59.4370, lng: 24.7536 }, // Координаты центра карты
      zoom: 14 // Масштаб карты
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
        stopover: true
      }));
  
      const travelMode = transportationMode === 'WALKING' ? "WALKING" : "DRIVING";
  
      const request = {
        origin: route[0].coordinates,
        destination: route[route.length - 1].coordinates,
        waypoints,
        travelMode
      };
  
      directionsService.route(request, function(result, status) {
        if (status === "OK") {
          directionsDisplay.setDirections(result);
        }
      });
    }
  
    generateRandomRoute('WALKING');
  }