import TracksManager from "../Tracks/TracksManager";

class TrackCanvasConverter {

  // Convert a pixel value to a time
  static pxToTime(x_position) {
    return Math.round(x_position / (this.beat_length_px));
  };

  // Convert a time to a pixel value
  static timeToPx(time) {
    return time * (this.beat_length_px);
  };

  // Get the pixel value of the nearest grid division
  static nearestDivisionPx(x_position) {
    return Math.round(x_position / this.beat_length_px) * this.beat_length_px;
  }

  // Get the track at the current vertical position
  static getTrack(px_height) {

    // Get the track ids
    let ids = Object.keys(TracksManager._tracks);
    let start_height = 0;

    // Go through the tracks
    for(let track_id of ids) {

      // Check if the click position is inside the track bounds
      let track = TracksManager._tracks[track_id];
      let after_start = px_height > start_height; 
      let before_end = px_height < start_height + track.drawing_data.height;

      // Return the id of the track
      if (after_start && before_end) {
        track.drawing_data.start_y = start_height;
        return track_id;
      }

      // Set the new height to start checking from
      start_height = start_height + track.drawing_data.height;
    }

    // If we couldnt find a track
    return null;
  }

  //==== Variables
  static beat_length_px = 20;

}

export default TrackCanvasConverter;