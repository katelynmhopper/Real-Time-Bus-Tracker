mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0ZWx5bm1ob3BwZXIiLCJhIjoiY2wwcHptNHQyMWplNDNqdGsxb3JuZWVqMCJ9.tNvD3VVmZ7yrIdaLWBy1kA'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/navigation-day-v1',
  center: [-71.104081, 42.365554],
  zoom: 14
});


const busMarkers = {}; 

async function run(){
    // get bus data    
	const busData = await getBusLocations();
	console.log(new Date());
	console.log(busData);

	busData.forEach((bus) => {
		if (busMarkers[bus.id]) {
			busMarkers[bus.id].setLngLat([bus.attributes.longitude, bus.attributes.latitude]);
		} else {
			busMarkers[bus.id] = new mapboxgl.Marker()
				.setLngLat([bus.attributes.longitude, bus.attributes.latitude])
				.addTo(map);
			}
		})
	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();