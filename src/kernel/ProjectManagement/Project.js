// ===========================================================
//
// This class creates project data
//
// ===========================================================
const Timepiece = require("../../core/Time/Timepiece");
// ===========================================================

class Project {

  constructor() {
    this.name = null;
    this.updated = Timepiece.datetime();
    this.location = null;
  }

  // Set the project name
  set_name(name) {
    this.name = name;
  }

  // Set the file location to save the project
  set_location(location) {
    this.location = location;
  }

  // Serialise the project data
  get_data() {
    return JSON.stringify(this);
  }

}

module.exports = Project;