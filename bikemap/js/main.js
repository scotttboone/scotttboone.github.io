// boilerplate startup
if(window.attachEvent) {
    window.attachEvent('onload', loadMapbox);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function(evt) {
            curronload(evt);
            loadMapbox(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = loadMapbox;
    }
}   

//load background map
function loadMapbox() {
	mapboxgl.accessToken = 'pk.eyJ1Ijoic2NvdHR0Ym9vbmUiLCJhIjoiY2lsdjB3NHM4MDFocnZka3NvZ3QydDQydyJ9.Wy_MJGjGTCbcg4iNm7ffJg';
	  map = new mapboxgl.Map({
	      container: 'map',
	      style: 'mapbox://styles/mapbox/dark-v9',
	      center: [-97.724,30.262],
	      zoom: [14]
	  });
}

//map should load data for bounds on map movement? maybe with delay?

// function that accepts a current location and maps it to the nearest node in set

// function that 

//map.on('click', loadOSMData());

// load openstreetmap data; returns geojson object
function loadOSMData() {
    //document.getElementById('debug').value = "loading..."
    var mybounds = '('+
        map.getBounds().getSouth() +','+
        map.getBounds().getWest() +','+
        map.getBounds().getNorth() +','+
        map.getBounds().getEast() +')'

    //mybounds - '(30.250879189641353,-97.73687460327172,30.273119551100805,-97.71112539672875)'
    var myOverpassQuery = 
            'http://overpass.osm.rambler.ru/cgi/interpreter?data='+
            //'https://overpass-api.de/api/interpreter?data=' + 
            '[out:json];' +
            '('+
                'way[highway="residential"]' + mybounds + ';' +
                'way[highway="tertiary"]' + mybounds + ';' +
                'way[highway="unclassified"]' + mybounds + ';' +
                'way[highway="cycleway"]' + mybounds + ';' +
                'way[highway="footway"]' + mybounds + ';' +
                'way[highway="living_street"]' + mybounds + ';' +
                'way[highway="pedestrian"]' + mybounds + ';' +
                'way[highway="service"]' + mybounds + ';' +
                'way[cycleway]' + mybounds + ';' + //cycleways not starting with no/none
            ');'+
            '(._;>;);'+ //include all nodes recursively
            'out;'

    document.getElementById('debug').innerHTML = myOverpassQuery
    console.log(myOverpassQuery)

    jQuery.ajax({
        
        url: myOverpassQuery,                
        dataType: 'json',
        type: 'GET',
        async: true,
        crossDomain: true, 
        //success: function(json) {
        //    console.log(JSON.stringify(osmtogeojson(json)));
        //},
        success: function(json) {
            console.log(JSON.stringify(osmtogeojson(json)));
            
            // convert map data into geojson format
            var mapdata = new mapboxgl.GeoJSONSource({
                data: osmtogeojson(json)
            });

             // add source
            try{map.removeSource('path');}catch(err){}
            map.addSource('path', mapdata);

            // show source on map
            map.addLayer({
                "id": "path",
                "type": "line",
                "source": "path",
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#ff00ff",
                    "line-width": 2
                }

            });

            
        },
    }).done(function() {
        console.log( "second success" );
        //document.getElementById('mybutton').innerHTML = "loading..."

    }).fail(function(error) {
        console.log(error);
        console.log( "error" );
        document.getElementById('mybutton').innerHTML = "[error]"
    }).always(function() {
        console.log( "complete" );
        document.getElementById('mybutton').innerHTML = "where the burgers at "
    });


};
