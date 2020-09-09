// author: @dudash
// license: Apache 2.0

const axios = require("axios");
const API_URL = "https://api.erdemo.io";

// POSTS
export const postMyLocation = (lat,lon) =>
    axios.post(`${API_URL}/mystatus??latlng=${lat},${lon}&id=TODO_UID&appid=${process.env.REACT_APP_API_KEY}`);

// GETS
export const getLocationByLatLon = (lat, lon) =>
    axios.get(`${API_URL}/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_API_KEY}`);