/*--------------------------------------------------------------------
ConnectTO Suitability Tool
JavaScript
--------------------------------------------------------------------*/

//Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbHlzYWthZ3VjaGkiLCJhIjoiY2xkbTByeWl5MDF5YjNua2RmdWYyZ240ciJ9.l0mkQSD3VSua3-9301GQbA';

//Initialize map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/emilysakaguchi/clexsrdwn000901nllrb8b6wy',
    center: [-79.371, 43.720], //these cooraintes load Toronto at the centre of the map
    zoom: 10.5, //this zooms to show all of Toronto, so users can explore by zooming in to areas of interest
    maxBounds: [
        [-180, 30], // Southwest
        [-25, 84]  // Northeast
    ],
});