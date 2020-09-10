// author: @dudash
// license: Apache 2.0

const axios = require("axios");
const API_URL = "https://api.erdemo.io";

// POSTS
export const postMyLocation = (iid, lat,lon) =>
    axios.post(`${API_URL}/lifeline/${iid}`, {
        latitude: lat,
        longitude: lon,
        appId: process.env.REACT_APP_API_KEY
    });

// GETS
// ping the service to find the nearest address for this lat/lon
export const getLocationByLatLon = (lat, lon) =>
    axios.get(`${API_URL}/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_API_KEY}`);