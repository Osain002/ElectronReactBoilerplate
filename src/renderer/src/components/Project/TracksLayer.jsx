import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../App';
import CanvasManager from '../../Kernel/Canvas/CanvasManager';
import canvasTypes from '../../Kernel/Canvas/CanvasTypes';
import ToolTypes from '../../Kernel/ToolTypes';
import TracksManager from '../../Kernel/Tracks/TracksManager';
import { canvasClick, canvasDoubleClick, canvasMouseDown, canvasMouseMove, canvasMouseUp } from '../../Kernel/Utils/TracksLayer/TracksLayerFunctions';

const TracksLayer = ({width, pxWidth, pxHeight}) => {
  const { appContext, projectContext } = useContext(AppContext);

  // Make a ref for the canvas
  const tracksCanvasRef = useRef(null);

  // Get the tracks
  const tracks = projectContext.project.tracks();

  // Load the canvas
  useEffect(() => {
    const canvas = tracksCanvasRef.current;
    if (!canvas) return;
    let bundle = CanvasManager.addCanvas(canvasTypes.track, canvas);
    bundle.drawer.drawRegions();
  }, []);

  return (
    <>
      <canvas 
        ref={tracksCanvasRef} 
        width={pxWidth} 
        height={pxHeight} 
        className='absolute top-0 left-0 h-full' 
        style={{ width: width + 'px' }} 
        onDoubleClick={(event) => canvasDoubleClick(tracks, appContext.currentTool, event)}
        onClick={(event) => canvasClick(tracks, appContext.currentTool, event)}
        onMouseDown={(event) => canvasMouseDown(tracks, appContext.currentTool, event)}
        onMouseMove={(event) => canvasMouseMove(tracks, appContext.currentTool, event)}
        onMouseUp={(event) => canvasMouseUp(tracks, appContext.currentTool, event)}
      />
      {/* <PianoRoll showPianoRoll={showPianoRoll} setShowPianoRoll={setShowPianoRoll} track={tracks.getSelectedTrack()}/> */}
    </>
  )
}

export default TracksLayer