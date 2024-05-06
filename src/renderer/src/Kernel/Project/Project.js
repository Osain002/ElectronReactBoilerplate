// ===========================================================
//
// This class creates project data
//
// ===========================================================

class Project {

  constructor() {
    if (Project.instance) {
      return Project.instance;
    }

    this.name = null;
    this.location = null;
    this.tracks = [];
    this.num_tracks = 0;
    this.time_signatures = [];

    Project.instance = this;
  }

  //==== Config 

  // Set the project name
  setName(name) {
    this.name = name;
  }

  // Set the file location to save the project
  setLocation(location) {
    this.location = location;
  }

  // Serialise the project data
  getData() {
    return JSON.stringify(this);
  }

  //==== Time signatures
  insertTimeSignatureChange() {
    // Method implementation
  }

  //==== Tracks
  addTrack(track) {
    this.tracks.push(track);
    this.num_tracks++;
  }

  getTracks() {
    return this.tracks;
  }
}

export default Project;
