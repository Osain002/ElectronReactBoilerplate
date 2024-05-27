import {TracksManagerBase} from "../Tracks/Base/TracksManagerBase";

class Notes extends TracksManagerBase{

  constructor(data) {

    if(Notes._instance) {
      return Notes._instance;
    }

    super(null)
    this.child = this;
    this.setupKeys(data);
    Notes._instance = this;
  }

  getTracksObject() {
    return Notes._keys
  };

  // Setup the keys
  setupKeys(data) {

    if(data) {
      console.log(data)
      Notes._keys = data;
      return;
    }

    // Start the notes array
    Notes._keys = {};
    const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    const baseFrequency = 27.5; // A0 frequency
    const semitoneRatio = Math.pow(2, 1/12);

    // Add the notes to the array
    for (let i = 87; i >=0 ; i--) {
      const noteIndex = i % 12;
      const octave = Math.floor(i / 12);
      const frequency = baseFrequency * Math.pow(semitoneRatio, i);
      const track_data = {frequency: frequency, octave: octave};
      
      // Add a piano roll track
      this.getTrackBuilder()
        .setName(`${notes[noteIndex]}${octave}`)
        .setColour("red")
        .setHeight(12)
        .setExtraData("sound", track_data)
        .add();
    }
  }

  // Add a region to a track
  addRegion(track, data) {
    Notes._keys[track].regions.push(data);
  }

  // Destroy this instance
  destroy() {
    Notes._instance = null;
  }

  // The keys
  static _keys = {};
  static _instance;
}

export default Notes;