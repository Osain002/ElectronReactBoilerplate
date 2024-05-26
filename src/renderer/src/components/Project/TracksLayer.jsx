import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../App';
import CanvasManager from '../../Kernel/Canvas/CanvasManager';
import canvasTypes from '../../Kernel/Canvas/CanvasTypes';
import { canvasClick, canvasDoubleClick, canvasKeyPress, canvasMouseDown, canvasMouseMove, canvasMouseUp } from '../../Kernel/Utils/TracksLayer/TracksLayerFunctions';
import EditorOverlay from '../Overlays/EditorOverlay';

const TracksLayer = ({width, pxWidth, pxHeight}) => {

  const { appContext, projectContext } = useContext(AppContext);
  const [editorData, setEditorData] = useState();
  const [showEditor, setShowEditor] = useState();
  
  // Make a ref for the canvas
  const tracksCanvasRef = useRef(null);

  // Get the tracks
  const tracks = projectContext.project.tracks();

  // Load the canvas
  useEffect(() => {
    const canvas = tracksCanvasRef.current;
    if (!canvas) return;
    let bundle = CanvasManager.addCanvas(canvasTypes.track, canvas);
    bundle.drawer.drawRegions(tracks);
  }, []);

  // Open an editor overlay
  function openEditorOverlay(data) {
    setEditorData(data)
    setShowEditor(true);
  }

  // Extend the double click event
  function doubleClick(event) {
    let response = canvasDoubleClick(tracks, appContext.currentTool, event)
    console.log(response)
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
        onClick={(event) => canvasClick(tracks, appContext.currentTool, event)}
        onMouseDown={(event) => canvasMouseDown(tracks, appContext.currentTool, event)}
        onMouseMove={(event) => canvasMouseMove(tracks, appContext.currentTool, event)}
        onMouseUp={(event) => canvasMouseUp(tracks, appContext.currentTool, event)}
        onKeyUp={(event) => canvasKeyPress(tracks, appContext.currentTool, event)}
      />
      <EditorOverlay data={editorData} showOverlay={showEditor} setShowOverlay={setShowEditor}/>
    </>
  )
}

export default TracksLayer