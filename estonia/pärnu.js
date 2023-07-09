let button = document.querySelector( '.btn4').addEventListener('click', function() {
  let links1 = document.querySelector('.links-1');
  links1.innerHTML = '';

  maps()
      }) 
      function maps(params) {
          // Создаем тег <div> с идентификатором "map"
          var mapDiv = document.createElement('div');
          mapDiv.id = 'map';
          mapDiv.style.width = '100%';
          mapDiv.style.height = '500px';
          document.body.appendChild(mapDiv);
                  var map;
          
          function createMap(lat, lng) {
            map = new google.maps.Map(document.getElementById("map"), {
              center: { lat, lng },
              zoom: 12,
            });
          
            const marker = new google.maps.Marker({
              position: { lat, lng },
              map: map,
            });
          }
          
          function generateRandomRoute(places, mode) {
            const waypoints = [...places];
            const startPoint = waypoints.shift();
            const endPoint = waypoints[Math.floor(Math.random() * waypoints.length)];
          
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({ map });
          
            const request = {
              origin: startPoint.coordinates,
              destination: endPoint.coordinates,
              waypoints: waypoints.map(place => ({
                location: place.coordinates,
                stopover: true
              })),
              travelMode: google.maps.TravelMode[mode]
            };
          
            directionsService.route(request, function(response, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
              } else {
                console.error('Ошибка при получении маршрута:', status);
              }
            });
          }
          
          function parnu() {
            const places = [
              { name: "Парк Пярну", coordinates: { lat: 58.3750, lng: 24.5029 } },
              { name: "Пляж Пярну", coordinates: { lat: 58.3859, lng: 24.4955 } },
              { name: "Ратуша Пярну", coordinates: { lat: 58.3839, lng: 24.4981 } },
              { name: "Театр Эндла", coordinates: { lat: 58.3785, lng: 24.4995 } },
              { name: "Пярнуский музей", coordinates: { lat: 58.3752, lng: 24.5044 } }
            ];
          
            createMap(58.3749, 24.5136);
          }
          
          parnu();
          /*
          // Создаем кнопку "Сгенерировать пешеходный маршрут"
          var walkingButton = document.createElement('button');
          walkingButton.textContent = 'Сгенерировать пешеходный маршрут';
          walkingButton.onclick = function() {
            generateRandomRoute(places, 'WALKING');
          };
          document.body.appendChild(walkingButton);
          
          // Создаем кнопку "Сгенерировать автомобильный маршрут"
          var drivingButton = document.createElement('button');
          drivingButton.textContent = 'Сгенерировать автомобильный маршрут';
          drivingButton.onclick = function() {
            generateRandomRoute(places, 'DRIVING');
          };
          document.body.appendChild(drivingButton);
        */}