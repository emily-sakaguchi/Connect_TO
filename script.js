/*--------------------------------------------------------------------
ConnectTO Suitability Tool
JavaScript
--------------------------------------------------------------------*/


//Initialize map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=vYYUHMMF2krizlVhi9JA', // style URL
    center: [-79.371, 43.720], //these cooraintes load Toronto at the centre of the map
    zoom: 10, //this zooms to show all of Toronto, so users can explore by zooming in to areas of interest
    maxBounds: [
        [-180, 30], // Southwest
        [-25, 84]  // Northeast
    ],
    bearing: -17, // bearing in degrees
});

map.addControl(new maplibregl.NavigationControl());

/*--------------------------------------------------------------------
DATA
--------------------------------------------------------------------*/

let parks;
let ttcShelter;
let suitability;
let wayfinder;

// Fetch GeoJSON from github URL, convert response to JSON, and store response as variable 
fetch('https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/parks_rec.geojson')
    .then(response => response.json())      // Store response as JSON format
    .then(response => {
        console.log(response);      // Check response in console
        parks = response;       // Store GeoJSON as "substns" variable
    });

fetch('https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/Transit_shelter.geojson')
    .then(response => response.json())      // Store response as JSON format
    .then(response => {
        console.log(response);      // Check response in console
        ttcShelter = response;       // Store GeoJSON as "substns" variable
    });

fetch('https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/wayfinder.geojson')
    .then(response => response.json())      // Store response as JSON format
    .then(response => {
        console.log(response);      // Check response in console
        wayfinder = response;       // Store GeoJSON as "substns" variable
    });

fetch('https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/WifiOverlayVector.geojson')
    .then(response => response.json())      // Store response as JSON format
    .then(response => {
        console.log(response);      // Check response in console
        suitability = response;       // Store GeoJSON as "substns" variable
    });



// Adding layers to map
    map.on('load', () => {
    map.addSource('parks',{
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/parks_rec.geojson'
    });

    // // see if need to filter
    map.addLayer({
        'id': 'parks',
        'type': 'circle',
        'source': 'parks',
        'paint': {
            'circle-radius': 1.5,
            'circle-color': '#B42222' // red
        }
    });

    map.addSource('ttcShelter',{
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/Transit_shelter.geojson'
    });

// see if need to filter
    map.addLayer({
        'id': 'ttcShelter',
        'type': 'circle',
        'source': 'ttcShelter',
        'paint': {
            'circle-radius': 1.5,
            'circle-color': 'yellow' 
        }
    });

    map.addSource('wayfinder',{
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/wayfinder.geojson'
    });

// see if need to filter
    map.addLayer({
        'id': 'wayfinder',
        'type': 'circle',
        'source': 'wayfinder',
        'paint': {
            'circle-radius': 1.5,
            'circle-color': 'blue' 
        }
    });



    map.addSource('suitability', {
        type:'geojson',
        data:'https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/WifiOverlayVector.geojson'
    });

    map.addLayer({
        'id': 'suitability',
		'type': 'fill',
		'source': 'suitability',
		'paint': {
			'fill-color': [
				'step', 
				['get', 'V'],
				'grey', //colour for anything that falls outside the 1-10 range
				1, '#a50126', // red
				2, '#da362a', 
				3, '#f57b4a',
				4, '#fdbe6f',
				5, '#feeea1', //yellow
				6, '#eaf6a2',
				7, '#b7e175',
				8, '#74c465',
				9, '#229c53',
				10, '#006837' //green
            ],
            'fill-opacity': 0.9
			}
		}, 'parks','ttcShelter','wayfinder');

        map.addLayer({
            'id': 'suitability-hov',
            'type': 'fill',
            'source': 'suitability',
            'paint': {
                'fill-color': [
                    'step', 
                    ['get', 'V'],
                    'grey', //colour for anything that falls outside the 1-10 range
                    1, '#a50126', // red
                    2, '#da362a', 
                    3, '#f57b4a',
                    4, '#fdbe6f',
                    5, '#feeea1', //yellow
                    6, '#eaf6a2',
                    7, '#b7e175',
                    8, '#74c465',
                    9, '#229c53',
                    10, '#006837' //green
                ],
                'fill-outline-color': 'white',
                'fill-opacity': 1
                },
                'filter': ['==', ['get', 'fid'], ''] //Initial filter (returns nothing)
            }, 'parks','ttcShelter','wayfinder');
})

/*--------------------------------------------------------------------
HOVER EVENT    
- if a neighbourhood polygon is under the mouse hover, it will turn opaque and white to create a highighting effect
 --------------------------------------------------------------------*/
       
 map.on('mousemove', 'suitability', (e) => {
        
    if (e.features.length > 0) { //determines if there is a feature under the mouse
        map.setFilter('suitability-hov', ['==', ['get', 'fid'], e.features[0].properties.fid]); //applies the empty filter created
    }    
});
 
map.on('mouseleave', 'suitability-hov', () => { //removes the highlight when the mouse moves away
    map.setFilter("suitability-hov",['==', ['get', 'fid'], '']);   
});

/*--------------------------------------------------------------------
POP-UP ON CLICK EVENT
- When the cursor moves over the map, it changes from the default hand to a pointer
- When the cursor clicks on a feature, the name and classification will appear in a pop-up
--------------------------------------------------------------------*/
//Neighbourhoods pop-up
map.on('mouseenter', 'suitability', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switches cursor to pointer when mouse is over the neighbourhood-fill layer
});

map.on('mouseleave', 'suitability', () => {
    map.getCanvas().style.cursor = ''; //Switches cursor back when mouse leaves neighbourhood-fill layer
});

map.on('click', 'suitability', (e) => {
    new maplibregl.Popup() //Declares a new popup on each click
        .setLngLat(e.lngLat) //Coordinates of the mouse click to determine the coordinates of the pop-up
        //Text for the pop-up:
        .setHTML("<b>Suitability score:</b> " + e.features[0].properties.V + "<br>")
        .addTo(map); //Adds the popup to the map
});


/*--------------------------------------------------------------------
COLLAPSE MENU
- code collapses the menu of interctive features  to help users focus on the map
--------------------------------------------------------------------*/
var coll = document.getElementsByClassName("collapsible"); //"collapsible" the id set in the html to contain all the interactive features
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() { //when users click the button, it will expand
    this.classList.toggle("active-collapse"); 
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none"; //hides the menu
    } else {
      content.style.display = "block"; //shows the menu
    }
  });
}
/*--------------------------------------------------------------------
FILTER CHECKBOXES
- Allows layers to be checked and unchecked for display
--------------------------------------------------------------------*/

// Parks and rec
document.getElementById('parksCheck').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'parks',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    );
});

// bus shelters
document.getElementById('ttcShelterCheck').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'ttcShelter',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    );
});

// Wayfinders and information pillars
document.getElementById('wayfinderCheck').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'wayfinder',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    );
});

/*--------------------------------------------------------------------
RETURN BUTTON
- returns map to original extent
--------------------------------------------------------------------*/

//Event listener to return map view to full screen on button click
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.371, 43.720],
        zoom: 10,
        essential: true,
        bearing: -17, // bearing in degrees
    });
});
