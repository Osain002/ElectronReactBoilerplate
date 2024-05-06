import './App.css'

// Components
import AppView from './AppView'

// Utilities
import IPCListener from './Core/IPC/IPCListener'

// Hooks
import { createContext, useEffect, useReducer, useState } from 'react'
import FormOverlay from './components/Overlays/FormOverlay';
import trackReducer from './Kernel/Tracks/TrackReducer';
import GridDivisions from './Kernel/ProjectView/GridDivisions';
import Project from './Kernel/Project/Project';

// Create an app context
export const AppContext = createContext(null);


function App() {

  const project = new Project();

  // Hold the project data
  const [tracks, trackDispatch] = useReducer(trackReducer, []);
  const [gridType, setGridType] = useState(GridDivisions.BEATS_BARS);

  // Form overlay state handlers
  const [formType, setFormType] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Show the form overlay
  function show_form_overlay(type) {
    setFormType(type);
    setShowOverlay(true);
  }

  useEffect(() => {
    IPCListener((messageType, ...args) => {
      switch(messageType) {
        case "new_track": return show_form_overlay("new_track");
      }
    })
  }, []);

  const AppContextValues = {
    
    appContext: {
      setShowOverlay
    },

    projectContext: {
      project,
      gridType,
      trackDispatch
    }
  }

  return (
    <AppContext.Provider value={AppContextValues}>
      <AppView />
      <FormOverlay type={"new_track"} showOverlay={showOverlay} setShowOverlay={setShowOverlay}/>
    </AppContext.Provider>
  )
}

export default App
