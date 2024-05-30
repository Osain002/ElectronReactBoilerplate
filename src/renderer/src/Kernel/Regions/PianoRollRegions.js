//================================================================
//
// This class controls various types of region in the DAW
//
//================================================================
// const ArrayExtractor = require("../../Core/Arrays/ArrayExtractor");
//================================================================

import Regions from "./Base/Regions";

class PianoRollRegions extends Regions{

  constructor(tracks_manager) {
    super(tracks_manager);
  }
  // Set the region we are currently moving
  setEditingRegion(region) {
    PianoRollRegions.editing_region = region;
  }

  // Get moving region
  getEditingRegion() {
    return PianoRollRegions.editing_region;
  }

  static editing_region;
}

export default PianoRollRegions;