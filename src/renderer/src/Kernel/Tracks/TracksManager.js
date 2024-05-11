
class Tracks {

  constructor() {
    this._selected_track = null;
    this.tracks = [];
  }

  // Insert a track
  addTrack(track) {
    this.tracks.push(track);
  }
  
  // Get the tracks
  getTracks() {
    return this.tracks;
  }

  // Get the number of tracks
  getNumTracks() {
    return this.tracks.length;
  }

  // Get the selected track
  getSelectedTrack() {
    return this._selected_track;
  }

  // Set the selected track
  setSelectedTrack(track_id) {
    this._selected_track = this.tracks[track_id];
  }
}

export default Tracks;