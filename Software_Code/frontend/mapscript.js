
function openNav() {
  document.getElementById("myNav").style.width = "33.3333%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
      // This will let you use the .remove() function later on
      if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
          if (this.parentNode) {
              this.parentNode.removeChild(this);
          }
        };
      }

      mapboxgl.accessToken = 'pk.eyJ1IjoiZG9taXgiLCJhIjoiY2s1eHZrbmVpMTFxdTNucG9laHRzdXpwdyJ9.rjo6pGqpcVW62CC6eSscBw';
      /** 
       * Add the map to the page
      */
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-98.5795, 39.8283],
        zoom: 4,
        scrollZoom: false
      });

      // Add geolocate control to the map.
          /*  map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
              })
            );*/

        /*  function findLocation() {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  console.log(position)
                });
              }
          }

          navigator.geolocation.addEventListener('geolocate', findLocation);*/

      // Track user location (sends multiple requests)
      // var geolocate = new mapboxgl.GeolocateControl({trackUserLocation: true});

      var geolocate = new mapboxgl.GeolocateControl();

      map.addControl(geolocate);

      // Add full screen control to map
      map.addControl(new mapboxgl.FullscreenControl());

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());

      //Geocoder Search Bar
      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        });

      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

      geolocate.on('geolocate', function(e) {
            var lon = e.coords.longitude;
            var lat = e.coords.latitude
            var position = [lon, lat];
            console.log(position);
      });
 
     
 
        function insert(prov) {
          
        var div = document.getElementById('container');
        var child_div = document.createElement('div');
        var pro_name = prov.procedure_Def;
        var prov_name = prov.provider_Name;
        var pro_price = prov.avg_Medicare_Payments;
        child_div.innerHTML = `<p>${prov_name}: ${pro_name}: ${pro_price} </p>`;
        div.appendChild(child_div)

      }

      function getProcedures() {
        var url = `https://api.team5agile.dumitruvulpe.com`;
        var pro_uri = `/procedures/?search_query=`;
        var procedureName = document.getElementById("inputnameid").value;

        fetch(url + pro_uri + procedureName)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            //console.log(data)
            data.forEach(e => {
              insert(e)
              searchForProviderZip(e.provider_Zip)
              .then((res) => {
                //do smth with res
                //console.log('resolve')
                createGeoJSON(data, e, res)
                mapWait(dataGeoJSON)
              }).catch((err) => {
                console.log('reject')
                console.log(err)
                //deal with err
              });
            });
          })
          .catch((error) => {
            console.log(error)
          });
          
        }
        
        function searchForProviderZip(zip_code) {
          return new Promise((resolve, reject) => {
            var url = `https://api.team5agile.dumitruvulpe.com`;
            var zip_uri = '/zip2coords?zip=';
            fetch(url + zip_uri + zip_code)
            .then((res) => {
              return res.json();
            })
            .then((data) => {                  
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
          });
          
        }
        
        var newdata;
        var dataGeoJSON;
        var id = `id`;
        var i = 0;
        var output;
        
        const createGeoJSON = (data, e, res) => {
          //  console.log("data")
          //  console.log(data) //all procedures in array
          //  console.log("e")
          //  console.log(e) //each individual procedure
          //  console.log("res")
          //  console.log(res) //each individual zip code coords
          //  console.log("data[0]")
          //  console.log(data[0]) //first provider in array
          
          newdata = [
            {
              lat: res[0].zip_Lat,
              lng: res[0].zip_Long
            }
          ];
          
          newdata[0]["procedure_ID"] = e.procedure_ID;
          newdata[0]["procedure_Def"] = e.procedure_Def;
          newdata[0]["provider_Name"] = e.provider_Name;
          newdata[0]["provider_StreetAdd"] = e.provider_StreetAdd;
          newdata[0]["provider_City"] = e.provider_City;
          newdata[0]["provider_State"] =  e.provider_State;
          newdata[0]["provider_Zip"] = e.provider_Zip;
          newdata[0]["avg_Covered_Charges"] = e.avg_Covered_Charges;
          newdata[0]["avg_Total_Payments"] = e.avg_Total_Payments;
          newdata[0]["avg_Medicare_Payments"] = e.avg_Medicare_Payments;
          newdata[0]["provider_referral"] = e.provider_referral;
          newdata[0][id] = i++;
          
          dataGeoJSON = GeoJSON.parse(newdata, { Point: ["lat", "lng"] });
          output = JSON.stringify(dataGeoJSON, null, 4);
          //console.log(output)
          //console.log(dataGeoJSON)          
          //console.log(dataGeoJSON.features[0].properties.procedure_ID)
        }
        
        function mapWait(dataGeoJSON){
          /**
           * Wait until the map loads to make changes to the map.
           */
          
          //map.on('load', function () {

          if(map.getSource(dataGeoJSON)){
            map.removeSource(dataGeoJSON);
          }
           
            map.addSource("dataGeoJSON", {
              type: "geojson",
              data: dataGeoJSON,
              "properties.id": i++
            });

            /**
             * Add all the things to the page:
             * - The location listings on the side of the page
             * - The markers onto the map
             */
            buildLocationList(dataGeoJSON);
            addMarkers();
          //});
          
        }
          /**
           * Add a marker to the map for every provider listing.
           **/
          function addMarkers() {
          var i = 0;
            /* For each feature in the GeoJSON object above: */
          dataGeoJSON.features.forEach(function(marker) {
          /* Create a div element for the marker. */
          var el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = "marker-" + i;
          i++;
          /* Assign the `marker` class to each marker for styling. */
          el.className = 'marker';
          
          /**
           * Create a marker using the div element
           * defined above and add it to the map.
           **/
          new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
          
          /**
           * Listen to the element and when it is clicked, do three things:
           * 1. Fly to the point
           * 2. Close all other popups and display popup for clicked provider
           * 3. Highlight listing in sidebar (and remove highlight for all other listings)
           **/
          el.addEventListener('click', function(e){
            /* Fly to the point */
            flyToProvider(marker);
            /* Close all other popups and display popup for clicked provider */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            var activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            var listing = document.getElementById('listing-' + marker.properties.id);
            listing.classList.add('active');
          });
        });
      }

      /**
       * Add a listing for each provider to the sidebar.
      **/
      function buildLocationList(dataGeoJSON) {
        var x = document.getElementById("listings");
          if (x.style.display === "none") {
          x.style.display = "block";
          }
        dataGeoJSON.features.forEach(function(dataGeoJSON, i){
          /**
           * Create a shortcut for `provider.properties`,
           * which will be used several times below.
          **/
          var prop = dataGeoJSON.properties;

          /* Add a new listing section to the sidebar. */
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = "listing-" + prop.id;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';

          /* Add the link to the individual listing created above. */
          var link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = "link-" + prop.id;
          link.innerHTML = prop.procedure_Def + '   $' + prop.avg_Total_Payments;

          /* Add details to the individual listing. */
          var details = listing.appendChild(document.createElement('div'));
          details.innerHTML = prop.provider_Name;
          //if (prop.dataGeoJSON_StreetAdd) {
            details.innerHTML += ' · ' + prop.provider_City;
          //}

          /**
           * Listen to the element and when it is clicked, do four things:
           * 1. Update the `currentFeature` to the provider associated with the clicked link
           * 2. Fly to the point
           * 3. Close all other popups and display popup for clicked provider
           * 4. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          link.addEventListener('click', function(e){
            //for (var i=0; i < 5; i++) {
              if (this.id === "link-" + dataGeoJSON.properties.id) {
                var clickedListing = dataGeoJSON;
                flyToProvider(clickedListing);
                createPopUp(clickedListing);
              }
            //}
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });
        });
      }

      /**
       * Use Mapbox GL JS's `flyTo` to move the camera smoothly
       * a given center point.
      **/
      function flyToProvider(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 10
        });
      }

      /**
       * Create a Mapbox GL JS `Popup`.
      **/
      function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>' + currentFeature.properties.provider_Name +'</h3>' +
            '<h4>' + '$' + currentFeature.properties.avg_Medicare_Payments + '</h4>')
          .addTo(map);
      }
    
//https://docs.mapbox.com/mapbox.js/example/v1.0.0/map-center-geocoding/
// var geocoder = L.mapbox.geocoder('mapbox.places');

// var map = L.mapbox.map('map')
// .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// geocoder.query('Chester, NJ', showMap);

// function showMap(err, data) {
// // The geocoder can return an area, like a city, or a
// // point, like an address. Here we handle both cases,
// // by fitting the map bounds to an area or zooming to a point.
// if (data.lbounds) {
//     map.fitBounds(data.lbounds);
// } else if (data.latlng) {
//     map.setView([data.latlng[0], data.latlng[1]], 13);
// }
//}