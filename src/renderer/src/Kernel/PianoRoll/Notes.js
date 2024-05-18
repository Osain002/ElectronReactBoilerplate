class Notes {

  // Get the keys
  static getKeys() {
    if(!Notes.keys) {
      this.setupKeys();
    }
    return Notes.keys;
  }

  // Setup the keys
  static setupKeys() {

    // Start the notes array
    const keys = [];
    const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    const baseFrequency = 27.5; // A0 frequency
    const semitoneRatio = Math.pow(2, 1/12);

    // Add the notes to the array
    for (let i = 0; i < 88; i++) {
      const noteIndex = i % 12;
      const octave = Math.floor(i / 12);
      const frequency = baseFrequency * Math.pow(semitoneRatio, i);
      keys.push({
        note: notes[noteIndex] + octave,
        frequency: frequency
      });
    }

    // Set the notes
    Notes.keys = keys.reverse();
  }

  static keys;
}

export default Notes;