// ===========================================================
//
// This class manages project crud operations
//
// ===========================================================
import Project from "./Project";
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
  static load_project(data) {

  }

  // Save a project
  static saveProject(data) {
    console.log(JSON.stringify(data));
  }

}

export default ProjectManager;