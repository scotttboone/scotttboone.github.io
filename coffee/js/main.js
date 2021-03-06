window.onload = function() {
	
	// load dataset
	var shops = JSON.parse(shopsData);
	
	// load map
	loadMapBox(shops);
		
	// put dataset into array so we can sort, filter, etc
	var shopArray = []
	
	for (i = 0; i < shops.data.features.length; i++) {
		shopArray.push(shops.data.features[i])
	}
	
	// sort our array; will filter later
	shopArray.sort(function(a,b) {
		return a.properties.rating.overall < 
		b.properties.rating.overall
	});
	
	//shopArray.sort();


		
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

	var newNameDiv = document.createElement('div');
	newNameDiv.className = 'itemname';

	var newNameContent = document.createTextNode(shopElement.properties.name);
	newNameDiv.appendChild(newNameContent);

	var newRatingDiv = document.createElement('div');
	newRatingDiv.className = 'itemrating';
	newRatingDiv.style.backgroundColor = returnRatingColor(shopElement.properties.rating.overall);
	
	var newRatingContent = document.createTextNode(shopElement.properties.rating.overall);
	newRatingDiv.appendChild(newRatingContent);	
		
	var myContainer = document.getElementById('listContainer');
	
	myContainer.appendChild(newDiv);
	newDiv.appendChild(newNameDiv);
	newDiv.appendChild(newRatingDiv);
	
}

function returnRatingColor(value) {
	var valueFloat = parseFloat(value);
	
	if (valueFloat < 5 ) {
		return "red";
	} else if (valueFloat < 8 ) {
		return "yellow";
	} else if (valueFloat <= 10 ) {
		return "green";
	} else {
		return "white";
	}
}

function loadMapBox(shops) {
mapboxgl.accessToken = 'pk.eyJ1Ijoic2NvdHR0Ym9vbmUiLCJhIjoiY2lsdjB3NHM4MDFocnZka3NvZ3QydDQydyJ9.Wy_MJGjGTCbcg4iNm7ffJg';
	var map = new mapboxgl.Map({
		container: 'mapbox',
		style: 'mapbox://styles/mapbox/streets-v9',
		center: [-97.721090, 30.268506],
		zoom: 15
	});
	
	var popup = new mapboxgl.Popup({
    closeButton: false
	});

	map.on('load', function () {
		loadMapData(map, shops);
	});
}

function loadMapData(map, shops) {
	//alert(JSON.stringify(shops));
	
	try{map.removeSource('path');}catch(err){}
	map.addSource('path', shops);
	map.addLayer({
		"id": "shops",
		"type": "symbol",
		"source": 'path',
		"layout": {
			"icon-image": "cafe-15",
			"text-field": "{name}",
			"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],"text-offset": [0, 0.6],
            "text-anchor": "top"
		},
		"paint": {
			"icon-color": "#999999",
		}
	});
	
	
}


