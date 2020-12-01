import { makeObservable, observable, action } from "mobx"
import Moment from 'react-moment';
import 'moment-timezone';

class StateStore {
    address = "Unknown";
    lat = "";
    lon = "";
    incidentId = "";
    llUpdatedAt = Date.now;

    constructor() {
        makeObservable(this, {
            address: observable,
            setAddress: action
        
            ,lat: observable,
            setLat: action
        
            ,lon: observable,
            setLon: action
        
            ,llUpdatedAt: observable
        
            ,incidentId: observable,
            setIncidentId: action
        })
    }

    setAddress(address) { this.address = address;}

    setLat(lat) {
        this.lat = lat;
        this.llUpdatedAt = Moment.now
    }

    setLon(lon) {
        this.lon = lon;
        this.llUpdatedAt = Moment.now
    }

    setIncidentId(iid) { this.incidentId = iid;}
}

export { StateStore };