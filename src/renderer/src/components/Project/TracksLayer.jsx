import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../App';
import CanvasManager from '../../Core/Canvas/CanvasManager';
import canvasTypes from '../../Kernel/Canvas/CanvasTypes';
import EditorOverlay from '../Overlays/EditorOverlay';
import ToolTypes from '../../Kernel/ToolTypes';
import RegionCanvasEventHandler from '../../Kernel/Regions/RegionCanvasEventHandler';

const TracksLayer = ({width, pxWidth, pxHeight}) => {

  const { appContext, projectContext } = useContext(AppContext);
  const [editorData, setEditorData] = useState();
  const [showEditor, setShowEditor] = useState();
  const [eventHandler, setEventHandler] = useState();
  
  // Make a ref for the canvas
  const tracksCanvasRef = useRef(null);

  // Get the tracks
  const tracks = projectContext.project.tracks();

  // Load the canvas
  useEffect(() => {

    // Initialise the canvas
    const canvas = tracksCanvasRef.current;
    if (!canvas) return;
    let bundle = CanvasManager.addCanvas(canvasTypes.track, canvas);
    bundle.drawer.drawRegions(tracks);

    // Initialise the event handler
    let handler = new RegionCanvasEventHandler(tracks, bundle, true);
    setEventHandler(handler);
  }, []);

  // Redraw the tracks once an editor overlay is closed
  useEffect(() => {
    let bundle = CanvasManager.getCanvas(canvasTypes.track);
    bundle.drawer.drawRegions(tracks);
    appContext.setTool(ToolTypes.mouse);
  }, [showEditor]);

  // Open an editor overlay
  function openEditorOverlay(data) {
    setEditorData(data)
    setShowEditor(true);
  }

  // Extend the double click event
  function doubleClick(event) {
    let response = eventHandler.canvasDoubleClick(appContext.currentTool, event)
    if(response && response.editor) {
      return openEditorOverlay(response);
    }
  }

  return (
    <>
      <canvas 
        ref={tracksCanvasRef} 
        width={pxWidth} 
        height={pxHeight} 
        tabIndex={0}
        className='absolute top-0 left-0 h-full' 
        style={{ width: width + 'px' }} 
        onDoubleClick={doubleClick}
        onClick={(event) => eventHandler.canvasClick(appContext.currentTool, event)}
        onMouseDown={(event) => eventHandler.canvasMouseDown(appContext.currentTool, event)}
        onMouseMove={(event) => eventHandler.canvasMouseMove(appContext.currentTool, event)}
        onMouseUp={(event) => eventHandler.canvasMouseUp(appContext.currentTool, event)}
        onKeyUp={(event) => eventHandler.canvasKeyPress(appContext.currentTool, event)}
      />
      <EditorOverlay data={editorData} showOverlay={showEditor} setShowOverlay={setShowEditor}/>
    </>
  )
}

export default TracksLayer