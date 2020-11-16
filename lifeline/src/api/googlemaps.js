// author: @dudash
// license: Apache 2.0

const axios = require("axios");
const GOOGLE_MAP_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const GOOGLE_APIKEY = process.env.REACT_APP_GOOGLE_APIKEY || "undefined"
console.log("lifeline is using google maps geocoding from: " + GOOGLE_MAP_API_URL + ", with key: " + GOOGLE_APIKEY);

export const getLocationByLatLon = (lat, lon) =>
    axios.get(`${GOOGLE_MAP_API_URL}?latlng=${lat},${lon}&key=${GOOGLE_APIKEY}`);