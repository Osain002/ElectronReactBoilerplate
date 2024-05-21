import TracksManager from "../Tracks/TracksManager";

class TrackCanvasConverter {

  constructor() {
    this._zoom = 1;
    this.tracks = TracksManager._tracks;
    this.beat_length_px = 20;
  }

  // Convert a pixel value to a time
  pxToTime(x_position) {
    return Math.round(x_position / (this.beat_length_px*this._zoom));
  };

  // Convert a time to a pixel value
  timeToPx(time) {
    return time * (this.beat_length_px*this._zoom);
  };

  // Get the track at the current vertical position
  getTrack(px_height) {

    // Get the track ids
    let ids = Object.keys(this.tracks);
    let start_height = 0;

    // Go through the tracks
    for(let track_id of ids) {

      // Check if the click position is inside the track bounds
      let track = this.tracks[track_id];
      let after_start = px_height > start_height; 
      let before_end = px_height < start_height + track.drawing_data.height;

      // Return the id of the track
      if (after_start && before_end) {
        return track_id;
      }

      // Set the new height to start checking from
      start_height = start_height + track.drawing_data.height;
    }

    // If we couldnt find a track
    return null;
  }

}

export default TrackCanvasConverter;