//==========================================================
//
// This class manages the project tracks
//
//==========================================================
import {TracksManagerBase} from "./Base/TracksManagerBase";
//==========================================================

console.log('here tracks')
class TracksManager extends TracksManagerBase {

  constructor() {
    super(null);
    this.child = this; 
  }

  // Get the tracks object
  getTracksObject() {
    return TracksManager._tracks;
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

let n = new Notes()
export default TracksManager;