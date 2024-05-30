import './App.css'

// Components
import AppView from './AppView'

// Utilities
import IPCListener from './Core/IPC/IPCListener'

// Hooks
import { createContext, useEffect, useState } from 'react'
import FormOverlay from './components/Overlays/FormOverlay';
import GridDivisions from './Kernel/ProjectView/GridDivisions';
import Project from './Kernel/Project/Project';
import ToolTypes from './Kernel/ToolTypes';
import DraggableWindow from './Core/components/Draggable/Window';
import { AudioContextProvider } from './Audio/React/AudioContextProvider';

// Create an app context
export const AppContext = createContext(null);

function App() {

  const project = new Project();

  // Hold the project data
  const [gridType, setGridType] = useState(GridDivisions.BEATS_BARS);

  // Which tool are we using
  const [currentTool, setTool] = useState(ToolTypes.mouse); 

  // Form overlay state handlers
  const [formType, setFormType] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Show the form overlay
  function show_form_overlay(type) {
    setFormType(type);
    setShowOverlay(true);
  }

  // Handle incoming IPC messages
  useEffect(() => {
    IPCListener((messageType, ...args) => {
      switch(messageType) {
        case "new_track": return show_form_overlay("new_track");
      }
    })
  }, []);

  const AppContextValues = {
    
    appContext: {
      setShowOverlay,
      currentTool,
      setTool
    },

    projectContext: {
      project,
      gridType,
    }
  }

  return (
    <AudioContextProvider>
      <AppContext.Provider value={AppContextValues}>
        <AppView />
        <FormOverlay type={formType} showOverlay={showOverlay} setShowOverlay={setShowOverlay}/>
      </AppContext.Provider>
    </AudioContextProvider>
  )
}

export default App
