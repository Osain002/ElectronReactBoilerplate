import trackTypes from "../TrackTypes";
import TrackBase from "./Track";

class VirtualInstrumentTrack extends TrackBase {

  constructor(id, name) {
    super(id, name);
    this.type = trackTypes.VIRTUAL_INST;
  }

  // Add a new region
  new_region(start_px, end_px, start_beat, end_beat) {
    
    const region = {
      id: this.regions.length,
      start: start_px,
      end: end_px,
      beats: {
        start: start_beat,
        end: end_beat
      }
    }

    this.regions.push(region);
  }

  add_region() {
    
  }
  

}

export default VirtualInstrumentTrack;