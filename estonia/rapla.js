// Функция для обработки клика на кнопку с классом "btn6"
document.querySelector('.btn19').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем обновление страницы
    let links1 = document.querySelector('.links-1');
    links1.innerHTML = '';
  
    rapla();
  });
// Функция для отображения карты Viljandi
function rapla() {
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';  
    mapDiv.style.width = '100%';
    mapDiv.style.height = '500px';
    document.body.appendChild(mapDiv);
  
    const places = [
        { name: "Раплаская гимназия", coordinates: { lat: 58.9933, lng: 24.7896 } },
        { name: "Раплаская библиотека", coordinates: { lat: 58.9920, lng: 24.7951 } },
        { name: "Раплаская церковь", coordinates: { lat: 58.9914, lng: 24.7922 } },
        { name: "Раплаская площадь", coordinates: { lat: 58.9940, lng: 24.7920 } },
        { name: "Раплаская школа", coordinates: { lat: 58.9937, lng: 24.7875 } }
      ];
    
  
    const map = createMap(58.9930, 24.7910, places);
    generateRandomRoute(places, 'DRIVING', map);
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
  
    var mapDiv2 = document.createElement('div');
    mapDiv2.id = 'map';
    mapDiv2.style.width = '100%';
    mapDiv2.style.height = '500px';
    document.body.appendChild(mapDiv2);
  
    const map = new google.maps.Map(mapDiv2, {
      center: { lat: latitude, lng: longitude },
      zoom: 14
    });
  
    return map;
  }
  
  // Функция для генерации случайного маршрута
  function generateRandomRoute(places, transportationMode, map) {
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
  