// ================================================================
//
// Useful region functions
//
// ================================================================
// ================================================================

import TrackDrawer from "../Drawing/TrackDrawer";

export function makeRegion(track, event) {

  // Get a drawer
  const drawer = new TrackDrawer();

  // Make the region object
  const region = {};
  region.id = track.regions.length;
  region.drawing_data = drawer.newInstrumentRegion(track, event);

  // Return the empty region
  return region;
} 


// Select a region
export function selectRegion(track, event) {
  const drawer = new TrackDrawer();
  return drawer.selectRegion(track, event);
}

