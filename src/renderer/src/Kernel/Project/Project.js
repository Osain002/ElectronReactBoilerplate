// ===========================================================
//
// This class creates project data
//
// ===========================================================
import TracksManager from "../Tracks/TracksManager";
// ===========================================================

class Project {

  constructor() {
    if (Project.instance) {
      return Project.instance;
    }

    this._name = null;
    this._location = null;
    this._time_signatures = [];
    this._tracks = new TracksManager();

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

  saveData() {
    console.log(JSON.stringify(this));
  }

  //==== Tracks

  // Get the tracks
  tracks() {
    return this._tracks;
  }

  // Static variables
  static instance;
}

export default Project;
