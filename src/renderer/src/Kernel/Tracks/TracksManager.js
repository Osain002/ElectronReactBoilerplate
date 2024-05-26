//==========================================================
//
// This class manages the project tracks
//
//==========================================================
import {TracksManagerBase} from "./Base/TracksManagerBase";
//==========================================================

class TracksManager extends TracksManagerBase {

  constructor() {
    super(null);
    this.child = this; 
  }

  // Get the tracks object
  getTracksObject() {
    return TracksManager._tracks;
  }

  // Add a region to a track
  addRegion(track, data) {
    TracksManager._tracks[track].regions.push(data);
  }

  // The tracks object
  static _tracks = {};

}

class Notes extends TracksManagerBase {
  constructor() {
    super(null);
    this.child = this;
  }
}

export default TracksManager;