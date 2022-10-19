// Creating the map object

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  return a.toGMTString();
}

function getColor(depth) {
  let colors = ["#F7CEA0","#E09C91","#D0868F","#BB708E","#875D8E"];
  let labels = ["10","30","50","70","90"];
  for (var i = 0; i < colors.length; i++) {
    if(depth < labels[i]){
      return colors[i];
    }
  }
  return "#604E8A"
}

// Creating the map object
let myMap = L.map("map", {
  center: [30.06044, -112.30695],
  zoom: 6
});

let apiKey = "AAPK843bd0ce1156448797cc27e8f15b4c8f9mZE1ztY9PtLofkSKYleg4n5S8YKseqKHVDlH0cWzeLSiGZrFq8Dd8nMkTl2sfKI";

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

let geojson;
let scatterpoints;
let tectoniclayer;

// Get the data with d3.
d3.json(geoData).then(function(data) {

  d3.json(tectonicData).then(function(tectonicdata) {

  // Create a new choropleth layer.
  scatterpoints = L.choropleth(data, {

    // The number of breaks in the step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    // magnitude by size | depth by color
    pointToLayer: (feature, latlng) => {
      return new L.Circle(latlng, {
        radius: feature.properties.mag*10000,
        fillOpacity: 1,
        weight: 1,
        color: getColor(feature.geometry.coordinates[2]),
        fillColor: getColor(feature.geometry.coordinates[2]),
      });
    },

    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.title + "</strong><br><br><b>Occurance Time:</b> "+timeConverter(feature.properties.time)+"<br><b>Updated Time:</b> "+timeConverter(feature.properties.updated));
    }
  }).addTo(myMap);




  function style(feature) {
    return {
      fillColor: "#FFFFFFFF", //getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'yellow',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }




  tectoniclayer = L.geoJson(tectonicdata, {style: style}).addTo(myMap);

  // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    // let limits = geojson.options.limits;
    // let colors = geojson.options.colors;
    let colors = ["#F7CEA0","#E09C91","#D0868F","#BB708E","#875D8E","#604E8A"];
    let labels = ["-10 - 10","10 - 30","30 - 50","50 - 70","70 - 90","90+"];
    let legend_row = []

    colors.forEach(function(limit, index) {
      legend_row.push("<li style=\"margin-top: -9px; display: flex; margin-bottom: -9px;\"><div style='width: 30px; height: 22px; background-color: " + colors[index] + ";'></div><div style='padding-left: 5px; height: 22px;'>"+labels[index]+"</div></li>");
    });

    div.innerHTML += "<ul style=\"margin-top: 9px; margin-bottom: 9px;\">" + legend_row.join("<br>") + "</ul>";
    return div;
  };


  // adding map terrain switching option
  var vectorTiles = {};
  var allEnums = [
    'ArcGIS:Streets',
    'ArcGIS:Topographic',
    'ArcGIS:ModernAntique'
  ];

  allEnums.forEach((enumString) => {
    vectorTiles[
      enumString
    ] = L.esri.Vector.vectorBasemapLayer(enumString, {
      apiKey
    });
  });

  var layerControl = L.control
    .layers(vectorTiles, null, {
      collapsed: false
    })
    .addTo(myMap);

  layerControl.addOverlay(scatterpoints, "Earthquakes");
  layerControl.addOverlay(tectoniclayer, "Tectonic Plates");


  // Adding the legend to the map
  legend.addTo(myMap);

  document.getElementsByClassName('leaflet-control-layers-selector')[0].click();

  })

});
