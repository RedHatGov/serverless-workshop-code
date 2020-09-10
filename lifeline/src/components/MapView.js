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
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [stateStore.lat, stateStore.lon],
                zoom: 10
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map, stateStore.lat, stateStore.lon]);

    return (
        <div>
            <div ref={el => (mapContainer.current = el)} className="mapContainer"/>
        </div>
    );
}
export default observer(MapView);