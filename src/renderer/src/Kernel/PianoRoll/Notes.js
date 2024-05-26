import {TracksManagerBase} from "../Tracks/Base/TracksManagerBase";

class Notes extends TracksManagerBase{

  constructor() {
    super(null)
    this.child = this;
    this.setupKeys();
  }

  getTracksObject() {
    return Notes._keys
  };

  // Add a region
  addRegion(track, data) {
    this._tracks[track].regions.push(data);
  }

  // Setup the keys
  setupKeys() {

    // Start the notes array
    Notes._keys = {};
    const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    const baseFrequency = 27.5; // A0 frequency
    const semitoneRatio = Math.pow(2, 1/12);

    // Add the notes to the array
    for (let i = 0; i < 88; i++) {
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

  // The keys
  static _keys = {};
}

export default Notes;