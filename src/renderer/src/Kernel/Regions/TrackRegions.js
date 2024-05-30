//================================================================
//
// This class controls various types of region in the DAW
//
//================================================================
// const ArrayExtractor = require("../../Core/Arrays/ArrayExtractor");
//================================================================

import Regions from "./Base/Regions";

class TrackRegions extends Regions {

  constructor(tracks_manager) {
    super(tracks_manager);
  }
  // Set the region we are currently moving
  setEditingRegion(region) {
    TrackRegions.editing_region = region;
  }

  // Get moving region
  getEditingRegion() {
    return TrackRegions.editing_region;
  }

  static editing_region;
}

export default TrackRegions;