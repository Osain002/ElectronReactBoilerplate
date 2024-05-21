//================================================================
//
// This class controls various types of region in the DAW
//
//================================================================
// const ArrayExtractor = require("../../Core/Arrays/ArrayExtractor");
//================================================================

class RegionsController {

  // Tracks manager can be the manager for
  // the main project tracks as well as the
  // piano roll "tracks". This way we can use this class
  // for track regions and piano roll regions
  constructor(tracks_manager) {
    this.manager = tracks_manager;
    // this.regions = this.extractRegions();
  }

  // Add a new region starting at a given beat/time
  addRegion(start) {
    

  }


  //==== Utility functions
  extractRegions() {
    // return ArrayExtractor.extractKey(this.manager.tracks, "regions");
  }
}

export default RegionsController;