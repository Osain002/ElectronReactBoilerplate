// ===========================================================
//
// This class creates project data
//
// ===========================================================
import Tracks from "../Tracks/TracksManager";
// ===========================================================


class Project {

  constructor() {
    if (Project.instance) {
      return Project.instance;
    }

    this._name = null;
    this._location = null;
    this._time_signatures = [];
    this._tracks = new Tracks();

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

  // Get all tracks
  tracks() {
    return this._tracks;
  }

}

export default Project;
