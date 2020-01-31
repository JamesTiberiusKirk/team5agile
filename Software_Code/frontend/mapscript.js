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


  var provider = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.034084142948,
            38.909671288923
          ]
        },
        "properties": {
          "provider_Name": "TEXAS HEALTH HARRIS METHODIST HOSPITAL AZLE",
          "provider_StreetAdd": "108 DENVER TRAIL6",
          "provider_City": "AZLE",
          "avg_Total_Payments": "Washington DC",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "at 15th St NW",
          "procedure_Def": "20005",
          "provider_ID": 450419,
          "provider_State": "TX",
          "provider_Zip": "76020",
          "provider_referral": "TX - Fort Worth"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.049766,
            38.900772
          ]
        },
        "properties": {
          "provider_Name": "(202) 507-8357",
          "provider_StreetAdd": "2025078357",
          "provider_City": "2221 I St NW",
          "avg_Total_Payments": "Washington DC",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "at 22nd St NW",
          "procedure_Def": "20037"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043929,
            38.910525
          ]
        },
        "properties": {
          "provider_Name": "(202) 387-9338",
          "provider_StreetAdd": "2023879338",
          "provider_City": "1512 Connecticut Ave NW",
          "avg_Total_Payments": "Washington DC",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "at Dupont Circle",
          "procedure_Def": "20036"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.0672,
            38.90516896
          ]
        },
        "properties": {
          "provider_Name": "(202) 337-9338",
          "provider_StreetAdd": "2023379338",
          "provider_City": "3333 M St NW",
          "avg_Total_Payments": "Washington DC",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "at 34th St NW",
          "procedure_Def": "20007"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.002583742142,
            38.887041080933
          ]
        },
        "properties": {
          "provider_Name": "(202) 547-9338",
          "provider_StreetAdd": "2025479338",
          "provider_City": "221 Pennsylvania Ave SE",
          "avg_Total_Payments": "Washington DC",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "btwn 2nd & 3rd Sts. SE",
          "procedure_Def": "20003"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -76.933492720127,
            38.99225245786
          ]
        },
        "properties": {
          "provider_City": "8204 Baltimore Ave",
          "avg_Total_Payments": "College Park",
          "avg_Medicare_Payment": "United States",
          "procedure_Def": "20740"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.097083330154,
            38.980979
          ]
        },
        "properties": {
          "provider_Name": "(301) 654-7336",
          "provider_StreetAdd": "3016547336",
          "provider_City": "4831 Bethesda Ave",
          "cc": "US",
          "avg_Total_Payments": "Bethesda",
          "avg_Medicare_Payment": "United States",
          "procedure_Def": "20814"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.359425054188,
            38.958058116661
          ]
        },
        "properties": {
          "provider_Name": "(571) 203-0082",
          "provider_StreetAdd": "5712030082",
          "provider_City": "11935 Democracy Dr",
          "avg_Total_Payments": "Reston",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "btw Explorer & Library",
          "procedure_Def": "20190"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.10853099823,
            38.880100922392
          ]
        },
        "properties": {
          "provider_Name": "(703) 522-2016",
          "provider_StreetAdd": "7035222016",
          "provider_City": "4075 Wilson Blvd",
          "avg_Total_Payments": "Arlington",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "at N Randolph St.",
          "procedure_Def": "22203"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.28784,
            40.008008
          ]
        },
        "properties": {
          "provider_Name": "(610) 642-9400",
          "provider_StreetAdd": "6106429400",
          "provider_City": "68 Coulter Ave",
          "avg_Total_Payments": "Ardmore",
          "avg_Medicare_Payment": "United States",
          "procedure_Def": "19003"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.20121216774,
            39.954030175164
          ]
        },
        "properties": {
          "provider_Name": "(215) 386-1365",
          "provider_StreetAdd": "2153861365",
          "provider_City": "3925 Walnut St",
          "avg_Total_Payments": "Philadelphia",
          "avg_Medicare_Payment": "United States",
          "procedure_Def": "19104"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043959498405,
            38.903883387232
          ]
        },
        "properties": {
          "provider_Name": "(202) 331-3355",
          "provider_StreetAdd": "2023313355",
          "provider_City": "1901 L St. NW",
          "avg_Total_Payments": "Washington DC",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "at 19th St",
          "procedure_Def": "20036"
        }
      }
    ]
  };
      
  function addFeature(f){
    var newFeature = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.034084142948,
            38.909671288923
          ]
        },
        "properties": {
          "provider_Name": "TEXAS HEALTH HARRIS METHODIST HOSPITAL AZLE",
          "provider_StreetAdd": "108 DENVER TRAIL6",
          "provider_City": "AZLE",
          "avg_Total_Payments": "Washington DC",
          "avg_Medicare_Payment": "United States",
          "procedure_ID": "at 15th St NW",
          "procedure_Def": "20005",
          "provider_ID": 450419,
          "provider_State": "TX",
          "provider_Zip": "76020",
          "provider_referral": "TX - Fort Worth"
        }
    }
    // provider['features'].push(newFeature);
    console.log(provider)
  }
  
  /**
   * Assign a unique id to each provider. You'll use this `id`
   * later to associate each point on the map with a listing
   * in the sidebar.
  */
  provider.features.forEach(function(provider, i){
    provider.properties.id = i;
  });

  /**
   * Wait until the map loads to make changes to the map.
  */
  map.on('load', function (e) {
    /** 
     * This is where your '.addLayer()' used to be, instead
     * add only the source without styling a layer
    */
    map.addSource("provider", {
      "type": "geojson",
      "data": provider
    });

    /**
     * Add all the things to the page:
     * - The location listings on the side of the page
     * - The markers onto the map
    */
    buildLocationList(provider);
    addMarkers();
  });

  /**
   * Add a marker to the map for every provider listing.
  **/
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    provider.features.forEach(function(marker) {
      /* Create a div element for the marker. */
      var el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = "marker-" + marker.properties.id;
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
  function buildLocationList(data) {
    var x = document.getElementById("listings");
      if (x.style.display === "none") {
       x.style.display = "block";
      }
    data.features.forEach(function(provider, i){
      /**
       * Create a shortcut for `provider.properties`,
       * which will be used several times below.
      **/
      var prop = provider.properties;

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
      link.innerHTML = prop.provider_City;

      /* Add details to the individual listing. */
      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.avg_Total_Payments;
      if (prop.provider_StreetAdd) {
        details.innerHTML += ' · ' + prop.provider_Name;
      }

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the provider associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked provider
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
      **/
      link.addEventListener('click', function(e){
        for (var i=0; i < data.features.length; i++) {
          if (this.id === "link-" + data.features[i].properties.id) {
            var clickedListing = data.features[i];
            flyToProvider(clickedListing);
            createPopUp(clickedListing);
          }
        }
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
      zoom: 15
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
      .setHTML('<h3>Sweetgreen</h3>' +
        '<h4>' + currentFeature.properties.provider_City + '</h4>')
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
// }