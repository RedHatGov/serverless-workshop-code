import { observable, action, decorate } from "mobx";
import Moment from 'react-moment';
import 'moment-timezone';

class StateStore {
    address = "Unknown";
    setAddress(address) { this.address = address;}
    
    lat = "";
    setLat(lat) {
        this.lat = lat;
        this.llUpdatedAt = Moment.now
    }
    lon = "";
    setLon(lon) {
        this.lon = lon;
        this.llUpdatedAt = Moment.now
    }
    llUpdatedAt = Date.now;

    incidentId = "";
    setIncidentId(iid) { this.incidentId = iid;}
}

StateStore = decorate(StateStore, {
    address: observable,
    setAddress: action

    ,lat: observable,
    setLat: action

    ,lon: observable,
    setLon: action

    ,llUpdatedAt: observable

    ,incidentId: observable,
    setIncidentId: action
});

export { StateStore };