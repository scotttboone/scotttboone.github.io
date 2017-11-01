window.onload = function() {
	// load map
	loadMapBox();
	
	// load dataset
	var shops = JSON.parse(shopsData);
	
	// put dataset into array so we can sort, filter, etc
	var shopArray = []
	
	for (i = 0; i < shops[0].features.length; i++) {
		shopArray.push(shops[0].features[i])
	}
	
	// sort our array; will filter later
	shopArray.sort(function(a,b) {
		return a.properties.rating.overall < 
		b.properties.rating.overall
	});
	
	shopArray.sort();
		
	for (i = 0; i < shopArray.length; i++) {
		writeListDiv(shopArray[i])
	}
	

}

function getMapBounds() {
	var mybounds = '('+
    map.getBounds().getSouth() +','+
    map.getBounds().getWest() +','+
    map.getBounds().getNorth() +','+
    map.getBounds().getEast() +')'
    
    var myCenter = map.getCenter()
}	

function sortFilterJSON() {
	alert(arguments[0]);
}

function writeListDiv(shopElement) {
	//alert(shopElement.properties.name)
	var newDiv = document.createElement('div');
	newDiv.className = 'listitem';
	
	var newContent = document.createTextNode(
		shopElement.properties.name + 
		": " + 
		shopElement.properties.rating.overall);
	newDiv.appendChild(newContent);
	
	
	var myContainer = document.getElementById('listContainer');
	
	myContainer.appendChild(newDiv);

}

function loadMapBox() {
mapboxgl.accessToken = 'pk.eyJ1Ijoic2NvdHR0Ym9vbmUiLCJhIjoiY2lsdjB3NHM4MDFocnZka3NvZ3QydDQydyJ9.Wy_MJGjGTCbcg4iNm7ffJg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-88.13734351262877, 35.137451890638886],
    zoom: 4
});

map.on('load', function () {

    map.addLayer({
        'id': 'urban-areas-fill',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_urban_areas.geojson'
        },
        'layout': {},
        'paint': {
            'fill-color': '#f08',
            'fill-opacity': 0.4
        }
    // This is the important part of this example: the addLayer
    // method takes 2 arguments: the layer as an object, and a string
    // representing another layer's name. if the other layer
    // exists in the stylesheet already, the new layer will be positioned
    // right before that layer in the stack, making it possible to put
    // 'overlays' anywhere in the layer stack.
    }, 'water');
});
}
