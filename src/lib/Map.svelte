<script>
	import {onMount} from 'svelte';
	import maplibregl from 'maplibre-gl';
	// import Select from "svelte-select";
	import parksRec from "../data/parks_rec.geo.json"
	import ttcShelter from "../data/Transit_shelter.geo.json"
	import wayfinder from "../data/wayfinder.geo.json"
	import suitability from "../data/WifiOverlayVector.geo.json"

	// pmtiles style loading
	import layers from 'protomaps-themes-base';

	// let PMTILES_URL = "https://build.protomaps.com/20240123.pmtiles?key=30ce074e38619138";
	// let protocol = new pmtiles.Protocol();
	// maplibregl.addProtocol('pmtiles', protocol.tile);


	let pageHeight;
	let pageWidth;
	
	let map;

	let mapHeight = 600;
	$: if (pageHeight < 800) {
		mapHeight = pageHeight * 0.64;
	} else {
		mapHeight = 600
	};

	let mapWidth = 1200;
	$: if (pageWidth < 1200) {
		mapWidth = pageWidth
	} else {
		mapWidth = 1200
	}


	onMount(() => {

		map = new maplibregl.Map({
			container: 'map',
			center: [-79.391, 43.725],
			zoom: 10,
			minZoom: 6,
			maxZoom: 11,
			bearing: 0,
			projection: 'globe',
			scrollZoom: true,
			attributionControl: false,
			style: {
				"version": 8,
				"name": "Empty",
				"glyphs": 
				//"https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
				"https://schoolofcities.github.io/fonts/fonts/{fontstack}/{range}.pbf",
				"sources": {
					'protomaps': {
						type: 'vector',
						url: 'https://api.protomaps.com/tiles/v3.json?key=3881c303b9fe6eb9'
					}
				},
				"layers": [
					{
						"id": "bg",
						"type": "background",
						"paint": {
							"background-color": "#f5f5f5",
							"background-opacity": 1
						}
					}
				]
			}
		});

		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();
		map.scrollZoom.disable();
		

		// console logging what protomaps layers are available // can remove this later
		let protoLayers = layers("protomaps","white");
		console.log(protoLayers);


		// initial layers to load on the map (water, roads)
	
		map.on('load', function() {
			map.addLayer({
				"id": "water",
				"type": "fill",
				"source": "protomaps",
				"source-layer": "water",
				"paint": {
					"fill-color": "#bdbfbf",
					"fill-outline-color": "#dedede"
				}
			})

			map.addLayer({
				"id": "roads_major",
				"type": "line",
				"source": "protomaps",
				"source-layer": "roads",
				"paint": {
					"line-color": "white",
					"line-opacity": 0.65,
					"line-width": [
						"interpolate",
						[
							"exponential",
							1
						],
						[
							"zoom"
						],
						6, 0, 10, 1
					]
				}
			});

			map.addLayer({
				"id": "roads_highway",
				"type": "line",
				"source": "protomaps",
				"source-layer": "roads",
				"filter": [
					"all",
					[
"==",
						"pmap:kind",
						"highway"
					]
				],
				"paint": {
					"line-color": "white",
					"line-opacity": 0.65,
					"line-width": [
						"interpolate",
						[
							"exponential",
							1
						],
						[
							"zoom"
						],
						6, 1, 10, 1.5
					]
				}
			
			});

			map.addSource('parksRec', {
				'type': 'geojson',
				'data': parksRec
			});
		// see if need to filter
			map.addLayer({
				'id': 'parksRec',
				'type': 'circle',
				'source': 'parksRec',
				'paint': {
					'circle-color': 'green',
					'circle-radius': 2
				},
			});
			map.setLayoutProperty(
				'parksRec',
				'visibility',
				'none'
			);

			map.addSource('ttcShelter', {
				'type': 'geojson',
				'data': ttcShelter
			});
		// see if need to filter
			map.addLayer({
				'id': 'ttcShelter',
				'type': 'circle',
				'source': 'ttcShelter',
				'paint': {
					'circle-color': 'red',
					'circle-radius': 1.5
				},
			});
			map.setLayoutProperty(
				'ttcShelter',
				'visibility',
				'none'
			);

			map.addSource('wayfinder', {
				'type': 'geojson',
				'data': wayfinder
			});
		// see if need to filter
			map.addLayer({
				'id': 'wayfinder',
				'type': 'circle',
				'source': 'wayfinder',
				'paint': {
					'circle-color': 'blue',
					'circle-radius': 1.5
				},
			});

			map.setLayoutProperty(
				'wayfinder',
				'visibility',
				'none'
			);

			map.addSource('suitability', {
				'type': 'geojson',
				'data': suitability
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
						5, '#feeea1',
						6, '#eaf6a2',
						7, '#b7e175',
						8, '#74c465',
						9, '#229c53',
						10, '#006837' //green
            ],
            'fill-opacity': 0.5
			}
		}, 'parksRec','ttcShelter','wayfinder');

		// duplicate of above layer for hover event
		map.addLayer({
				'id': 'suitability-hov',
				'type': 'fill',
				'source': 'suitability',
				'filter': ['==', ['get', 'fid'], ''],
				'paint': {
					'fill-color': [
						'step', 
						['get', 'V'],
						'grey', //colour for anything that falls outside the 1-10 range
						1, '#a50126', // red
						2, '#da362a', 
						3, '#f57b4a',
						4, '#fdbe6f',
						5, '#feeea1',
						6, '#eaf6a2',
						7, '#b7e175',
						8, '#74c465',
						9, '#229c53',
						10, '#006837' //green
            ],
            'fill-opacity': 1
			} 
		}, 'parksRec','ttcShelter','wayfinder');


			map.addLayer({
				
				"id": "places_locality",
				"type": "symbol",
				"source": "protomaps",
				"source-layer": "places",
				"filter": [
					"==",
					"pmap:kind",
					"locality"
				],
				"layout": {
					"text-field": "{name}",
					"text-font": [
					"case",
					[
						"<=",
						[
						"get",
						"pmap:min_zoom"
						],
						5
					],
					[
						"literal",
						["TradeGothic LT Regular"]
					],
					[
						"literal",
						["TradeGothic LT Regular"]
					]
					],
					"text-padding": [
					"interpolate",["linear"],
					["zoom"],
					5,
					3,
					8,
					7,
					12,
					11
					],
					"text-size": ["interpolate",
					["linear"],
					[
						"zoom"
					],
					2,
					[
						"case",
						[
						"<",
						[
							"get",
							"pmap:population_rank"
						],
						13
						],
						8,
						[
						">=",
						[
							"get",
							"pmap:population_rank"
						],
						13
						],
						13,
						0
					],
					4,
					[
						"case",
						[
						"<",
						[
							"get",
							"pmap:population_rank"
						],
						13
						],
						10,
						[
						">=",
						[
							"get",
							"pmap:population_rank"
						],
						13
						],
						15,
						0
					],
					6,
					[
						"case",
						[
						"<",
						[
							"get",
							"pmap:population_rank"
						],
						12
						],
						11,
						[
						">=",
						[
							"get",
							"pmap:population_rank"
						],
						12
						],
						17,
						0
					],
					8,
					[
						"case",
						[
						"<",
						[
							"get",
							"pmap:population_rank"
						],
						11
						],
						11,
						[
						">=",
						[
							"get",
							"pmap:population_rank"
						],
						11
						],
						18,
						0
					],
					10,
					[
						"case",
						[
						"<",
						[
							"get",
							"pmap:population_rank"
						],
						9
						],
						12,
						[
						">=",
						[
							"get",
							"pmap:population_rank"
						],
						9
						],
						20,
						0
					],
					15,
					[
						"case",
						[
						"<",
						[
							"get",
							"pmap:population_rank"
						],
						8
						],
						12,
						[
						">=",
						[
							"get",
							"pmap:population_rank"
						],
						8
						],
						22,
						0
					]
					],
					"icon-padding": [
					"interpolate",
					[
						"linear"
					],
					[
						"zoom"
					],
					0,
					2,
					8,
					4,
					10,
					8,
					12,
					6,
					22,
					2
					],
					"text-anchor": [
					"step",
					[
						"zoom"
					],
					"left",
					8,
					"center"
					],
					"text-radial-offset": 0.2
				},
				"paint": {
					"text-color": "#4d4d4d",
					"text-halo-color": "#ffffff",
					"text-halo-width": 1
				}

			});

	

		});

	});	


// HOVER EVENT

	function handleMouseMove (e) {
        console.log('true');
		map.getCanvas().style.cursor = 'pointer';
		// if (e.features.geometry == MutiPolygon) { //determines if there is a feature under the mouse
            map.setFilter('suitability-hov', ['==', ['get', 'fid'], e.features[0].properties.fid]); //applies the filter set above
        }
    // };
	
	function handleMouseLeave () { //removes the highlight when the mouse moves away
		console.log('false');
		map.getCanvas().style.cursor = '';
       map.setFilter("suitability-hov",['==', ['get', 'fid'], '']);
   };


	// CHECKBOX FUNCTIONS
	
	function toggleParks (e) {
		map.setLayoutProperty(
        'parksRec',
        'visibility',
        e.target.checked ? 'visible' : 'none')

	}

	function toggleTTC (e) {
		map.setLayoutProperty(
        'ttcShelter',
        'visibility',
        e.target.checked ? 'visible' : 'none')

	}

	function toggleWayfinder (e) {
		map.setLayoutProperty(
        'wayfinder',
        'visibility',
        e.target.checked ? 'visible' : 'none')

	}

	function toggleSuitability (e) {
		map.setLayoutProperty(
        'suitability',
        'visibility',
        e.target.checked ? 'visible' : 'none')

	}


	//zoom button functionality
	
	function zoomIn() {

		map.zoomIn();
	}
	function zoomOut() {
		map.zoomOut();
	}


</script>



<svelte:window bind:innerHeight={pageHeight} bind:innerWidth={pageWidth}/>
<label>Parks
	<input type="checkbox" id = "parksCheck" on:click={toggleParks}>
	</label>
<br>
<label>Transit Shelters
	<input type="checkbox" id = "transitCheck" on:click={toggleTTC}>
</label>
<br>
<label>Wayfinders
	<input type="checkbox" id = "wayfinderCheck" on:click={toggleWayfinder}>
</label>
<br>
<label>Suitability rating
	<input type="checkbox" id = "suitability" checked on:click={toggleSuitability}>
</label>


		<div class = 'container'>
			<div id="map" class="map" style="height: {mapHeight}px" on:mousemove={handleMouseMove} on:mouseleave={handleMouseLeave}>	
				<!-- zoom buttons-->
				<div class="map-zoom-wrapper">	
					<div on:click={zoomIn} class="map-zoom">+</div>
					<div on:click={zoomOut} class="map-zoom">‒</div>	
				</div>
			</div>
		</div>
		



<style>
	#map {
		width: 100%;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
		margin-top: 5px;
		border-top: 1px solid var(--brandGray);
		border-bottom: 1px solid var(--brandGray);
		background-color: white;
		z-index: 1;
		position:relative;
	}

	#map:hover {
		cursor: move;
	}
	
	.container {
		position: relative;
	}
	
	/* p {
		font-family: RobotoBold;
		margin: 0 auto;
		text-align: left;
		font-size: 14px;
		color: var(--brandBlack);
	}

	/* toggle styling */
	:root {
		--accent-color: var(--brandDarkBlue);
	}

	.toggle button:hover {
        cursor: pointer;
		background-color:lightgray;
    }

	.toggle button {
        padding: 0px;
		margin-top: 0px;
		height: 35px;
		min-width: 110px;
        background-color: #fff;
        border: 1px solid #cdcdcd;
		border-radius: 5px;
    }
   
    .toggle button span {
        pointer-events:none;
        padding: 6px;
		padding-bottom: 10px;
    }

	[role='switch'][aria-checked='false'] :first-child {
        background: var(--accent-color);
        display: inline-block;
		color: #fff;
		border-radius: 5px;
		height: 12px;
		min-width: 40px;
    }

    [role='switch'][aria-checked='true'] :last-child {
        background: var(--accent-color);
        display: inline-block;
		color: #fff;
		border-radius: 5px;
		height: 12px;
		min-width: 40px;
    }

	/* zoom controls */
	
	.map-zoom-wrapper {
		margin-top: 5px;
		margin-left: 5px;
		right: 5px;
		position: absolute;
		z-index: 2;
	}

	.map-zoom {
		/* display: block; */
		/* position: relative; */
		padding: 0px;
		padding-bottom: 3px;
		padding-left: 1px;
		margin: 0px;
		font-size: 23px;
		width: 25px;
		height: 25px;
		overflow: hidden;
		overflow-y: hidden;
		background-color: var(--brandGray70);
		color: white;
		border: solid 1px var(--brandWhite);
		text-align: center;
		margin: 0 auto;
		z-index: 2;
	}
	.map-zoom:hover {
		cursor: pointer;
		background-color: var(--brandGray90);
	}

</style>




