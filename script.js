/*--------------------------------------------------------------------
ConnectTO Suitability Tool
JavaScript
--------------------------------------------------------------------*/


//Initialize map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=vYYUHMMF2krizlVhi9JA', // style URL
    center: [-79.371, 43.720], //these cooraintes load Toronto at the centre of the map
    zoom: 10.5, //this zooms to show all of Toronto, so users can explore by zooming in to areas of interest
    maxBounds: [
        [-180, 30], // Southwest
        [-25, 84]  // Northeast
    ],
});

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

fetch('https://raw.githubusercontent.com/emily-sakaguchi/ConnectTO_v1/main/data/Transit_shelter.geojson')
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
            'circle-radius': 4,
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
            'circle-radius': 4,
            'circle-color': 'yellow' 
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
            'fill-opacity': 0.5
			}
		}, 'parks');
})