import trackTypes from "../TrackTypes";
import TrackBase from "./Track";

class AudioTrack extends TrackBase {

  constructor(id, name) {
    super(id, name);
    this.type = trackTypes.AUDIO;
  }

  
}

export default AudioTrack;