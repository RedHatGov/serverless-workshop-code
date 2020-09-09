// author: @dudash
// license: Apache 2.0

const axios = require("axios");
const GOOGLE_MAP_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export const getLocationByLatLon = (lat, lon) =>
    axios.get(`${GOOGLE_MAP_API_URL}?latlng=${lat},${lon}&key=${process.env.REACT_APP_GOOGLE_APIKEY}`);