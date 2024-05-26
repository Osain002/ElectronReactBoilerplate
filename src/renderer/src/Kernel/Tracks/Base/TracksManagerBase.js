//==========================================================
//
// This class manages the project tracks
//
//==========================================================
import ArrayTools from "../../../Core/Arrays/ArrayTools";
import Regions from "../../Regions/Regions";
import TrackDataBuilder from "../TrackDataBuilder";
//==========================================================
export class TracksManagerBase {

  
  constructor(child) {
    this.child = child
  }

  //==== Track generation

  // Get the tracks
  getTracksObject() {};

  // Get the id for the next track
  getNextId() {
    let tracks = this.child.getTracksObject();
    return Object.keys(tracks).length + 1;
  }

  // Get a track builder
  getTrackBuilder() {
    const id = this.getNextId();
    return new TrackDataBuilder(this.child, id);
  }

  // Insert a track
  addTrack(track_data) {
    let tracks = this.child.getTracksObject();
    tracks[track_data.id] = track_data;
    this._selected_track = track_data;
  } 
  
  //==== Getting/Setting tracks 

  // Get the number of tracks
  trackCount() {
    let tracks = this.child.getTracksObject();
    return Object.keys(tracks).length;
  }

  // Get all the tracks. Optionally as an array
  getTracks(as_array=false) {
    let tracks = this.child.getTracksObject();
    if(as_array) {
      return ArrayTools.objectToArray(tracks);
    } else {
      return tracks;
    }
  }

  // Get a track
  getTrack(track_id) {
    let tracks = this.child.getTracksObject();
    return tracks[track_id];
  }
  
  // Get the selected track
  getSelectedTrack() {
    return this._selected_track;
  }

  // Set the selected track
  setSelectedTrack(id) {
    this._selected_track = tracks[id] ?? null;
  }
  
  //==== Regions

  // Get the regions
  regions() {
    return new Regions(this.child);
  }

  // Add a region
  addRegion(track, data) {}

}
