// This is a reducer function for handling track operations

import Project from "../Project/Project";

function trackReducer(tracks, action) {

  // Get the current project data
  const project = new Project();

  switch(action.type) {
    case 'new': return project.addTrack(action.track);
  }
}


export default trackReducer;