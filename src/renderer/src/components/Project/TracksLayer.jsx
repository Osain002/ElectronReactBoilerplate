import React, { useContext, useEffect, useRef, useState } from 'react'
import TrackDrawer from '../../Kernel/Tracks/Drawing/TrackDrawer';
import { AppContext } from '../../App';
import ToolTypes from '../../Kernel/ToolTypes';
import CanvasManager from '../../Core/Canvas/CanvasManager';
import canvasTypes from '../../Core/Canvas/CanvasTypes';
import PianoRoll from '../PianoRoll/PianoRoll';

const TracksLayer = ({width, pxWidth, pxHeight}) => {
  const { appContext, projectContext } = useContext(AppContext);

  // Make a ref for the canvas
  const tracksCanvasRef = useRef(null);

  // Get the tracks
  const tracks = projectContext.project.tracks();

  // State for showing/hiding the piano roll
  const [showPianoRoll, setShowPianoRoll] = useState(false);

  // Load the drawer
  useEffect(() => {

    // Get the canvas ref
    const canvas = tracksCanvasRef.current;
    if (!canvas) return;

    // Add the canvas to the manager
    CanvasManager.addCanvas(canvasTypes.track, canvas);

    // Draw the current regions
    const drawer = new TrackDrawer();
    drawer.redrawAllRegions();
    
  }, []);

  // Handle canvas double click
  function canvasDoubleClick(event) {
    event.stopPropagation();

    // Get the track
    const track = tracks.getSelectedTrack();
    if(!track) return;

    // Get the mode
    const mode = appContext.currentTool;    
    if(mode == ToolTypes.draw) {
      track.newRegion(event)
    } else if (mode == ToolTypes.mouse) {
      track.selectRegion(event);
      setShowPianoRoll(true);
    }
  }

  // Handle canvas click
  function canvasClick(event) {
    event.stopPropagation();

    // Get the track
    const track = tracks.getSelectedTrack();
    if(!track) return;

    // Get the mode
    const mode = appContext.currentTool;    
    if(mode == ToolTypes.mouse) {
      track.selectRegion(event);
    }

  }

  // Handle the canvas hover
  function canvasMouseMove(event) {
    event.stopPropagation();

    // Get the track
    const track = tracks.getSelectedTrack();
    if(!track) return;

    // If we are not dragging
    const drawer = new TrackDrawer();
    if (!TrackDrawer.dragging) {
      return drawer.handleHover(track, event);
    }

    // If we are dragging
    if(TrackDrawer.dragging) {
      return drawer.handleDrag(track, event);
    }
  }

  // Handle mouse down
  function canvasMouseDown(event) {
    event.stopPropagation();

    // Get the track
    const track = tracks.getSelectedTrack();
    if(!track) return;

    // Get the mode
    const mode = appContext.currentTool;
    const drawer = new TrackDrawer();

    if(mode == ToolTypes.mouse && drawer.detectEdge(track, event)) {
      return track.resizeRegion(event);
    } else if(mode == ToolTypes.mouse) {
      return track.moveRegion(event);
    }
  }

  // Handle the mouse up event
  function canvasMouseUp(event) {
    event.stopPropagation();
    
    // Get the track
    const track = tracks.getSelectedTrack();
    if(!track) return;

    const drawer = new TrackDrawer();
    drawer.stopDragging();
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
      <PianoRoll showPianoRoll={showPianoRoll} setShowPianoRoll={setShowPianoRoll} track={tracks.getSelectedTrack()}/>
    </>
    )
}

export default TracksLayer