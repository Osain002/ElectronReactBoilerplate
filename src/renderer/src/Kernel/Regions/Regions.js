//================================================================
//
// This class controls various types of region in the DAW
//
//================================================================
// const ArrayExtractor = require("../../Core/Arrays/ArrayExtractor");
//================================================================

import ArrayExtractor from "../../Core/Arrays/ArrayExtractor";
import TracksManager from "../Tracks/TracksManager";
import Cursors from "../Utils/Cursors";
import TrackCanvasConverter from "../Utils/TrackCanvasConverter";

class Regions {

  // Tracks manager can be the manager for
  // the main project tracks as well as the
  // piano roll "tracks". This way we can use this class
  // for track regions and piano roll regions
  constructor(tracks_manager) {
    this.manager = tracks_manager;
  }

  //=== Region controls

  // Add a new region starting at a given beat/time
  addRegion(track_id, start, init_beats=4) {
    
    // Get the track
    const track = TracksManager._tracks[track_id];
    const region = {};
    region.track = track_id;
    region.drawing_data = {
      x: TrackCanvasConverter.timeToPx(start),
      y: track.drawing_data.start_y,
      width: TrackCanvasConverter.timeToPx(init_beats),
      height: track.drawing_data.height,
      colour: track.drawing_data.colour,
      temp: {}
    }

    // Add the region to the track
    this.addToTrack(track_id, region);
  }

  // Select a region
  selectRegion(track_id, position) {

    // Get the regions
    let regions = this.getAllRegions();
    
    // Go through the regions and check which one was clicked
    for (let region of regions) {
      let drawing_data = region.drawing_data;
      if (
        drawing_data.x < position
        && drawing_data.x + drawing_data.width > position 
        && region.track == track_id
      ) {
        region["selected"] = true;
      } else {
        region["selected"] = false;
      }
    }
  }

  // Resize a region
  resizeRegion(region, edge, position, snap_to_grid) {

    // If we are snapping to the grid
    if(snap_to_grid) {
      position = TrackCanvasConverter.nearestDivisionPx(position);
    }

    // Resize from the left hand side
    if (edge == Regions.proximity_types.left_edge) {
      let new_width = region.drawing_data.x + region.drawing_data.width - position;
      region.drawing_data.x = position;
      region.drawing_data.width = new_width
      console.log(region);
    }
    
    // Resize from the right hand side
    if(edge == Regions.proximity_types.right_edge) {
      let new_width = position - region.drawing_data.x;
      region.drawing_data.width = new_width;
    }
  }

  // Move a region
  moveRegion(region, position, snap_to_grid) {

    // If we are snapping to the grid
    if(snap_to_grid) {
      console.log(position);
      position = TrackCanvasConverter.nearestDivisionPx(position);
    }

    let delta_x = 0;
    let previous_position = region.drawing_data.temp.prev_x;
    if(previous_position) {
      delta_x = position - previous_position; 
    }

    region.drawing_data.temp.prev_x = position;
    region.drawing_data.x += delta_x;
  }


  //==== Proximity functions
  
  // Check if we are near a region edge
  isNearRegionEdge(region, position, tolerance=10) {
    let drawing_data = region.drawing_data;
    let near_start = Math.abs(drawing_data.x - position) < tolerance;
    let near_end = Math.abs(drawing_data.x + drawing_data.width - position) < tolerance;
    
    // If we are nearest the start
    if(near_start) {
      return Regions.proximity_types.left_edge;
    }

    // If we are nearest the end
    if(near_end) {
      return Regions.proximity_types.right_edge;
    }

    // If we are not near any end
    return null;
  }

  // Check if the mouse position is inside a region
  isInsideRegion(track_id, region, position) {
    console.log(region, position);
    let drawing_data = region.drawing_data;
    return drawing_data.x <= position
    && drawing_data.x + drawing_data.width > position 
    && region.track == track_id
  }
  
  //==== Management functions

  // Get the region closest to the mouse position
  getNearestRegion(track_id, position, tolerance) {

    // Get the regions
    let regions = this.getTrackRegions(track_id);

    // Check which region is closest
    let proximity_type = null;
    for(let region of regions) {
      let near_edge = this.isNearRegionEdge(region, position, tolerance);
      let is_interior = this.isInsideRegion(track_id, region, position);
      console.log(is_interior)
      // If we are close to an edge
      if(near_edge) {
        proximity_type = near_edge;
        return {
          region: region, 
          proximity_type: proximity_type, 
        }
      }

      // If we inside a region
      if(is_interior) {
        proximity_type = Regions.proximity_types.interior;
        return {
          region: region, 
          proximity_type: proximity_type
        }
      }
    }
    return null;
  }

  // Get region given a position 
  getRegionAtPosition(track_id, position) {

    // Get the regions
    let regions = this.getAllRegions(); 

    // Go through the regions and check which one was clicked
    for (let region of regions) {
      if (this.isInsideRegion(track_id, region, position)) {
        return region;
      }
    }
    return null;
  }
  

  // Get the regions on a track
  getTrackRegions(track_id) {
    let track = this.manager.getTrack(track_id);
    if (!track) {
      return [];
    }

    return track.regions;
  }
  
  // Get all the regions
  getAllRegions() {
    let tracks = this.manager.getTracks(true);
    if (!tracks) {
      return [];
    }
    return ArrayExtractor.extractKey(tracks, "regions", true);
  }
  
  // TODO: This will need to do some kind of time ordering on the regions array
  addToTrack(track_id, region) {
    return this.manager.addRegion(track_id, region);
  }

  // The proximity types
  static proximity_types = {
    left_edge: 1,
    right_edge: 2, 
    interior: 3,
  }

  //==== Data functions

  // Clear the temporary drawing data
  clearTempDrawingData() {
    let regions = this.getAllRegions();
    for(let region of regions) {
      region.drawing_data.temp = {};
    }
  }

}

export default Regions;