<script>

	import TopSofC from "../lib/TopSofC.svelte";
	import Map from "../lib/Map.svelte";
	import "../assets/global-styles.css";
	import topImage from "../assets/top-image.png"
	
</script>



<svelte:head>
	
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, minimum-scale=1"
	/>

	<title> ConnectTO</title>
	<meta name="description" content="Public Wifi Site Selector">
	<meta name="author" content="Emily Sakaguchi">


</svelte:head>



<TopSofC/>

<main>

	<!-- <div class="top-image">
		<img src="" alt="Your Image Description">
	</div> -->
	
	<div class="text">

		<div class="title">
			<h1>ConnectTO: Mapping possibilities for the City of Toronto's Free Wi-Fi Pilot Project</h1>
			<p>Emily Sakaguchi</p>
		</div>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p>
			At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem reru[d]um facilis est e[r]t expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellend[a]us. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
		</p>

		<h3>Pilot Program Site Evluation Tool</h3>
		
		<p>
			Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. 
		</p>
		
	</div>

	<Map/>    

	<div class="text">

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<h3>Potential Implementation Sites</h3>

		<p>
			At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem reru[d]um facilis est e[r]t expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellend[a]us. 
		</p>

		<p>
			Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
		</p>
	

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		
	</div>

	<div class="text">

<!-- 
		<h3>Acknowledgements</h3>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		</p>
 -->
   

		<h3>Data sources and methods</h3>
	  
	  
		<p>
			The base map and reference layers are from <a href = 'https://protomaps.com/' target = 'blank'>Protomaps</a> and <a href = 'https://www.openstreetmap.org/#map=3/71.34/-96.82' target = 'blank'>OpenStreetMap</a>.
		</p>
		<p>
			This webpage uses the JavaScript framework <a href='https://svelte.dev/' target = 'blank'>Svelte</a>. Maps and charts were created using <a href='https://d3js.org/' target = 'blank'>D3</a> and <a href='https://maplibre.org/' target = 'blank'>MapLibre GL JS</a>.
		</p>
		<p>
			Data and code for this work are on <a href='https://github.com/' target = 'blank'>GitHub</a>.
		</p>

		

	



</main>

<style>

	
</style>

