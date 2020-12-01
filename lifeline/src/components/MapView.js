// author: @dudash
// license: Apache 2.0
// for reference: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

import React from "react";
import { observer } from "mobx-react";
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiamFzb25yZWRoYXQiLCJhIjoiY2lseHVmZmkwMDVzMTgza3NiazZzZXg4ciJ9.5iDS06m7GN2wuv2hwQePpQ';

function MapView({ stateStore }) {
    const [map, setMap] = React.useState(null);
    const mapContainer = React.useRef(null);
    
    React.useEffect(() => {
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/satellite-streets-v11',
                center: [stateStore.lon, stateStore.lat],
                zoom: 15
            });

            map.addControl(new mapboxgl.NavigationControl());
            var geolocate = new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true})
            map.addControl(geolocate);
            geolocate.on("geolocate", function(position) {
                console.log("A geolocate event has occurred - using those coordinates: " + position.coords.latitude + "," + position.coords.longitude)
                stateStore.setLat(position.coords.latitude);
                stateStore.setLon(position.coords.longitude);
            });
            map.on("load", () => {
                setMap(map);
                map.resize();
                geolocate.trigger();
            });

            // this could allow us to set the location based on map center point - we'd want to place a marker 
            // on the map to make this obvious to the user
            // this feature will allow the user to mark a more precise location manually.
            // map.on("move", function() {
            //     console.log("A move event occurred " + map.getCenter());
            //     var center = map.getCenter();
            //     stateStore.setLat(center.lat);
            //     stateStore.setLon(center.lng);
            //  // TODO display animated center pin and turn off mapbox's geolocate if it's on
            // });
        };

        if (!map) initializeMap({ setMap, mapContainer });
        else map.resize();

        // TODO recenter map using new coordinates
        console.log("Mapview setting coords: lat,lon = " + stateStore.lat + "," + stateStore.lon)
    }, [map, stateStore.lat, stateStore.lon]);

    return (
        <div ref={el => (mapContainer.current = el)} className="mapContainer">
        </div>
    );
}
export default observer(MapView);