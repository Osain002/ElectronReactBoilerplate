import { makeRegion } from "../Regions/Region";
import trackTypes from "../TrackTypes";
import TrackBase from "./Track";

class VirtualInstrumentTrack extends TrackBase {

  constructor(id, name) {
    super(id, name);
    this.type = trackTypes.VIRTUAL_INST;
  }

  // Insert a new region
  newRegion(event) {
    const region = makeRegion(this, event);
    this.regions.push(region);
  }
  
}

export default VirtualInstrumentTrack;