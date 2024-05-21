import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../App';
import ToolTypes from '../../Kernel/ToolTypes';
// import PianoRoll from '../PianoRoll/PianoRoll';
import CanvasManager from '../../Kernel/Canvas/CanvasManager';
import canvasTypes from '../../Kernel/Canvas/CanvasTypes';

const TracksLayer = ({width, pxWidth, pxHeight}) => {
  const { appContext, projectContext } = useContext(AppContext);

  // Make a ref for the canvas
  const tracksCanvasRef = useRef(null);

  // Get the tracks
  const tracks = projectContext.project.tracks();

  // State for showing/hiding the piano roll
  // const [showPianoRoll, setShowPianoRoll] = useState(false);

  // Load the canvas
  useEffect(() => {
    const canvas = tracksCanvasRef.current;
    if (!canvas) return;
    CanvasManager.addCanvas(canvasTypes.track, canvas);
  }, []);

  // Handle canvas double click
  function canvasDoubleClick(event) {
    let handler = CanvasManager.getEventHandler(canvasTypes.track);
    handler.mouseEvent(event, function(x_position, track) {
      console.log(x_position, track);
    })

  }

  // Handle canvas click
  function canvasClick(event) {

  }

  // Handle the canvas hover
  function canvasMouseMove(event) {

  }

  // Handle mouse down
  function canvasMouseDown(event) {

  }

  // Handle the mouse up event
  function canvasMouseUp(event) {

  }

  return (
    <>
      <canvas 
        ref={tracksCanvasRef} 
        width={pxWidth} 
        height={pxHeight} 
        className='absolute top-0 left-0 h-full' 
        style={{ width: width + 'px' }} 
        onDoubleClick={canvasDoubleClick}
        onClick={canvasClick}
        onMouseDown={canvasMouseDown}
        onMouseMove={canvasMouseMove}
        onMouseUp={canvasMouseUp}
      />
      {/* <PianoRoll showPianoRoll={showPianoRoll} setShowPianoRoll={setShowPianoRoll} track={tracks.getSelectedTrack()}/> */}
    </>
  )
}

export default TracksLayer