//==========================================================
//
// This class manages the project tracks
//
//==========================================================
import ArrayTools from "../../Core/Arrays/ArrayTools";
import Regions from "../Regions/Regions";
import TrackDataBuilder from "./TrackDataBuilder";
//==========================================================

class TracksManager {

  constructor() {
    this._selected_track = null;
  }

  //==== Track generation
  // Get the id for the next track
  getNextId() {
    return Object.keys(TracksManager._tracks).length + 1;
  }

  // Get a track builder
  getTrackBuilder() {
    const id = this.getNextId();
    return new TrackDataBuilder(this, id);
  }

  // Insert a track
  addTrack(track_data) {
    TracksManager._tracks[track_data.id] = track_data;
    this._selected_track = track_data;
  } 
  
  //==== Getting/Setting tracks 

  // Get the number of tracks
  trackCount() {
    return Object.keys(TracksManager._tracks).length;
  }

  // Get all the tracks. Optionally as an array
  getTracks(as_array=false) {
    if(as_array) {
      return ArrayTools.objectToArray(TracksManager._tracks);
    } else {
      return TracksManager._tracks;
    }
  }

  // Get a track
  getTrack(track_id) {
    return TracksManager._tracks[track_id];
  }
  
  // Get the selected track
  getSelectedTrack() {
    return this._selected_track;
  }

  // Set the selected track
  setSelectedTrack(id) {
    this._selected_track = TracksManager._tracks[id] ?? null;
  }
  
  //==== Regions

  // Get the regions
  regions() {
    return new Regions(this);
  }

  // Add a region to a track
  addRegion(track, data) {
    console.log(TracksManager._tracks[track]);
    TracksManager._tracks[track].regions.push(data);
  }

  // Add the static variables
  static _tracks = {};
}

export default TracksManager;