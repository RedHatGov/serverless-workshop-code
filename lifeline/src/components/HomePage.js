// author: @dudash
// license: Apache 2.0
// inspired by work here: https://medium.com/swlh/how-to-add-geolocation-to-a-react-app-af2d55a8b5e3
import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Formik } from "formik"; // forms helper
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import * as yup from "yup"; // validate schemas
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import LocationDetailsView from "./LocationDetailsView";
import MoreInfoView from "./MoreInfoView";
// import MapView from "./MapView";
// import ChatView from "./ChatView";
import QueryString from "query-string";
import { geolocated } from "react-geolocated";
import { postMyLocation } from "../api/emergencyapi";
import MapView from "./MapView";

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

    //         // TODO: error handling, set an warning state and visualize in the app

    //     } else {
    //         const address = (data.results[0].address_components.find(c => c.types.includes("locality")) || {} ).long_name;
    //         localStorage.setItem("address", address);
    //         stateStore.setAddress(address);
    //     }
    // };

    const shareMyLocation = async () => {
        const { latitude, longitude } = coords;
        if (!stateStore.incidentId) {
            console.log("no incident")
            // TODO: error handling, alert user to an issue - not that they can do anything about it
        } else {
            try {
                const { status } = await postMyLocation(stateStore.incidentId, latitude, longitude);
                console.log("postMyLocation get status = " + JSON.stringify(status));
            } catch (e) {
                console.error('postMyLocation error!');
                // TODO: error handling, Indicate error condition to UI
            }
        }
    };

    React.useEffect(() => {
        const parsed = QueryString.parse(window.location.search);
        // console.log(parsed);
        if (parsed.incidentId) {
            console.log("got incident id: "+ parsed.incidentId);
            stateStore.setIncidentId(parsed.incidentId);
        }
        if (!initialized) {
            stateStore.setAddress(localStorage.getItem("address") || "Unknown");
            setInitialized(true);
        }
        if (coords) {
            const { latitude, longitude } = coords;
            stateStore.setLat(latitude);
            stateStore.setLon(longitude);
            console.log("HomePage setting coords: lat,lon = " + stateStore.lat + "," + stateStore.lon)
        }
    }, [initialized, coords, stateStore]);

    return (
        <div className="App-homepage-form">

            {/* TODO: error handling, popup error if geolocation is unavailable after TIMEOUT (currently 5) seconds with instructions on how to enable in iOS/Android settings */}

            <h1>How can we help?</h1>
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
                                <Form.Label>Verify the map is on your location, and provide form details</Form.Label>
                                <br/>
                                <Form.Label>Then tap the share button</Form.Label>
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
                        <CssBaseline />
                        <Container maxWidth="sm">
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh' }}>
                                <MapView stateStore={stateStore} />
                            </Typography>
                            <br></br>
                        </Container>

                        <Tabs defaultActiveKey="locationdetails">
                            <Tab eventKey="locationdetails" title="Location">
                                <LocationDetailsView stateStore={stateStore} />
                                
                            </Tab>
                            {/* <Tab eventKey="chatview" title="Chat">
                                <ChatView stateStore={stateStore} />
                            </Tab> */}
                        </Tabs>
                        <br></br>
                        <Tabs defaultActiveKey="moredetails">
                            <Tab eventKey="moredetails" title="Provide Additional Info">
                                <MoreInfoView stateStore={stateStore} />
                            </Tab>
                        </Tabs>
                        <Button type="button" onClick={shareMyLocation} style={buttonStyle} disabled={!coords}>    
                            Share My Info & Get Help
                        </Button>
                    </Form>
                )}
            </Formik>
            <br />

            {/* issue with these tabs + strict mode??
                https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage
            */}
        </div>
    );
}

// eslint-disable-next-line no-func-assign
HomePage = observer(HomePage);
export default geolocated({ positionOptions:{enableHighAccuracy:true}, userDecisionTimeout: 5000})(HomePage);