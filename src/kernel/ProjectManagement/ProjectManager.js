// ===========================================================
//
// This class manages project crud operations
//
// ===========================================================
const Project = require("./Project");
// ===========================================================

class ProjectManager {

  // Start a new project
  static create_project(data) {
    let project = new Project();
    project.set_name(data.name ?? "Untitled Song");
    project.set_location(data.location ?? "");
    return project;
  }

  // Open an existing project
  static open_project() {

  }

  // Save a project
  static save_project() {

  }

}

module.exports = ProjectManager;