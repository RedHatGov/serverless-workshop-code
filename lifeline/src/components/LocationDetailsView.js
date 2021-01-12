// author: @dudash
// license: Apache 2.0
import React from "react";
import { observer } from "mobx-react";
// import { postMyLocation } from "../api/emergencyapi";
import ListGroup from "react-bootstrap/ListGroup";
import Moment from 'react-moment';
import 'moment-timezone';

function LocationDetailsView({ stateStore }) {
    // TODO: uncomment to automatically send location on every change
    // const sendMyLocation = async (lat,lon) => {
    //     const response = await postMyLocation(lat,lon);
    //     setMyStatus(response.data);
    // };

    React.useEffect(() => {
        // TODO: uncomment to automatically send location on every change
        // if (stateStore.lat && stateStore.lon) {
        //     sendMyLocation(stateStore.lat, stateStore.lon);
        // } else {
        //     console.log("LocationDetailsView - not sending updated location - no known coords")
        // }
    }, [stateStore.lat, stateStore.lon, stateStore.llUpdatedAt]);

    return (
        <div>
            <ListGroup>
                <ListGroup.Item>Location (Lat/Lon): {stateStore.lat}, {stateStore.lon}</ListGroup.Item>
                {/* <ListGroup.Item>Location (Closest Address): {stateStore.address}</ListGroup.Item> */}
                <ListGroup.Item>Updated: <Moment calendar>{stateStore.llUpdatedAt}</Moment></ListGroup.Item>
            </ListGroup>
        </div>
    );
}
export default observer(LocationDetailsView);