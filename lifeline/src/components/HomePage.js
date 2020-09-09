// author: @dudash
// license: Apache 2.0
// inspired by work here: https://medium.com/swlh/how-to-add-geolocation-to-a-react-app-af2d55a8b5e3
import React from "react";
import { Formik } from "formik"; // forms helper
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import * as yup from "yup"; // validate schemas
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Location from "./LocationTab";
import MoreInfo from "./MoreInfoTab";

import { geolocated } from "react-geolocated";
import { getLocationByLatLon } from "../api/googlemaps";
import { postMyLocation } from "../api/emergencyapi";

const schema = yup.object({address: yup.string().required("Address is required")});
const buttonStyle = { marginRight: "10px" };

function HomePage({ stateStore, coords }) {
    const [initialized, setInitialized] = React.useState(false);
    
    const handleSubmit = async evt => {
        // manually entering an address - validate, set, share
        const isValid = await schema.validate(evt);
        if (!isValid) {return;}
        localStorage.setItem("address", evt.address);
        stateStore.setAddress(evt.address);

        // TODO: lookup and set lat/lon
        // TODO: share
    };

    // const getCurrentAddress = async () => {
    //     // Get closest address from lat/lon
    //     localStorage.clear();
    //     stateStore.setAddress("Unknown");
    //     const { latitude, longitude } = coords;
    //     const { data } = await getLocationByLatLon(latitude, longitude);
    //     console.log("getLocationByLatLon got data = " + JSON.stringify(data));
    //     if (data.results.length === 0) {
    //         console.log("Error: getLocationByLatLon got data = " + JSON.stringify(data));

    //         // TODO set an warning state and visualize in the app

    //     } else {
    //         const address = (data.results[0].address_components.find(c => c.types.includes("locality")) || {} ).long_name;
    //         localStorage.setItem("address", address);
    //         stateStore.setAddress(address);
    //     }
    // };

    const shareMyLocation = async () => {
        const { latitude, longitude } = coords;
        const { status } = await postMyLocation(latitude, longitude);
        console.log("postMyLocation get status = " + JSON.stringify(status));
    };

    React.useEffect(() => {
        console.log("homepage use effect");
        if (!initialized) {
            stateStore.setAddress(localStorage.getItem("address") || "Unknown");
            setInitialized(true);
        }
        if (coords) {
            const { latitude, longitude } = coords;
            stateStore.setLat(latitude);
            stateStore.setLon(longitude);

            // TODO try to lookup address from lat/lon

        }
    }, [initialized, coords, stateStore]);

    return (
        <div className="App-homepage-form">
            
            {/* TODO popup error if geolocation is unavailable after TIMEOUT (currently 5) seconds with instructions on how to enable in iOS/Android settings */}

            <h1>Please validate your location below</h1>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{ address: localStorage.getItem("address") || "" }}
                enableReinitialize={true}
            >
                {({ handleSubmit, handleChange, handleBlur, values, touched, isInvalid, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="address">
                                <Form.Label>Then tap the share button - it'll help us get there quicker</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Enter an address like: 123 Millwood Lane, Raleigh NC"
                                    value={values.address || ""}
                                    onChange={handleChange}
                                    isInvalid={touched.address && errors.address}
                                    disabled = {coords}
                                    hidden = {coords}
                                />
                                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback> */}
                            </Form.Group>
                        </Form.Row>
                        <Button type="button" onClick={shareMyLocation} style={buttonStyle} disabled={!coords}>    
                            Share My Current Location
                        </Button>
                    </Form>
                )}
            </Formik>
            <br />
            <Tabs defaultActiveKey="location">
                <Tab eventKey="location" title="Location">
                    <Location stateStore={stateStore} />
                </Tab>
                <Tab eventKey="moreinfo" title="More Info">
                    <MoreInfo stateStore={stateStore} />
                </Tab>
            </Tabs>
        </div>
    );
}

// eslint-disable-next-line no-func-assign
HomePage = observer(HomePage);
export default geolocated({ positionOptions:{enableHighAccuracy:true}, userDecisionTimeout: 5000})(HomePage);