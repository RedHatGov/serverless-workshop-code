// author: @dudash
// license: Apache 2.0

const axios = require("axios");
const API_URL = process.env.REACT_APP_INCIDENT_API_SERVICE_URL || "https://127.0.0.1"
console.log("lifeline is creating incidents by talking to: " + API_URL);

// POSTS
export const postMyLocation = (lat,lon) =>
    axios.post(`${API_URL}`, {
        latitude: lat,
        longitude: lon
        // appId: process.env.REACT_APP_API_KEY
    }
    // TODO get response back with indicent id?
    );

// GETS
// ping the service to find the nearest address for this lat/lon
export const getIncidentStatus = (iid) =>
    axios.get(`${API_URL}/status/id=${iid}`);