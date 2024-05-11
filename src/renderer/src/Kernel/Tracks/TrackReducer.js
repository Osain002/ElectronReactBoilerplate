// This is a reducer function for handling track operations

import { useContext } from "react";
import Project from "../Project/Project";
import { AppContext } from "../../App";

function trackReducer(tracks, action) {

  const project = new Project();

  switch(action.type) {
    case 'new': return project.tracks().addTrack(action.track);
  }
}


export default trackReducer;