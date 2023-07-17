// Функция для обработки клика на кнопку с классом "btn6"
document.querySelector('.btn8').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем обновление страницы
    let links1 = document.querySelector('.links-1');
    links1.innerHTML = '';
  
    san_juan();
  });
// Функция для отображения карты Viljandi
function san_juan() {
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';  
    mapDiv.style.width = '100%';
    mapDiv.style.height = '500px';
    document.body.appendChild(mapDiv);
  
    const places = [
        { name: "Paseo del Mar", coordinates: { lat: 6.9052, lng: 122.0749 } },
        { name: "Zamboanga City Hall", coordinates: { lat: 6.9105, lng: 122.0675 } },
        { name: "Plaza Pershing", coordinates: { lat: 6.9120, lng: 122.0759 } },
        { name: "Zamboanga Ecozone", coordinates: { lat: 6.9809, lng: 122.0626 } },
        { name: "Yakan Weaving Village", coordinates: { lat: 6.9117, lng: 122.0735 } }
      ];
      const map = createMap(6.9149, 122.0588, places);
      
      
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
  