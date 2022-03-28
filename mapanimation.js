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

//create bus stop markers
//bus stop long/ lat
const busStops = [
	[-71.093729, 42.359244],
	[-71.094915, 42.360175],
	[-71.095800, 42.360698],
	[-71.099558, 42.362953],
	[-71.103476, 42.365248],
	[-71.106067, 42.366806],
	[-71.108717, 42.368355],
	[-71.110799, 42.369192],
	[-71.113095, 42.370218],
	[-71.115476, 42.372085],
	[-71.117585, 42.373016],
	[-71.118625, 42.374863]
];

//Add markers to the map with loop
busStops.forEach((element) => {
	const stopMarker = new mapboxgl.Marker({color: 'orange', rotation: 45, scalre: 0.5})
	stopMarker.setLngLat(element).addTo(map);
})
