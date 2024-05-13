import React, { useContext, useEffect, useRef, useState } from 'react'
import TrackDrawer from '../../Kernel/Tracks/Drawing/TrackDrawer';
import { AppContext } from '../../App';
import ToolTypes from '../../Kernel/ToolTypes';

const TracksLayer = ({width, pxWidth, pxHeight}) => {
  const { appContext, projectContext } = useContext(AppContext);

  // Make a ref for the canvas
  const tracksCanvasRef = useRef(null);
  const [trackDrawer, setTrackDrawer] = useState(null);

  // Get the tracks
  const tracks = projectContext.project.tracks();

  // Load the drawer
  useEffect(() => {

    // Get the canvas ref
    const canvas = tracksCanvasRef.current;
    if (!canvas) return;

    // Make the drawer --- This is a singleton class
    const drawer = new TrackDrawer(canvas);
    setTrackDrawer(drawer);

  }, []);

  function getTrack() {
    if(!trackDrawer) {
      return;
    }

    // Get the mode and current track
    return tracks.getSelectedTrack();
  }

  // Handle canvas double click
  function canvasDoubleClick(event) {

    // Get the track
    const track = getTrack();
    if(!track) return;

    // Get the mode
    const mode = appContext.currentTool;    
    if(mode == ToolTypes.draw) {
      track.newRegion(event)
    }

  }

  // Handle canvas click
  function canvasClick(event) {

    // Get the track
    const track = getTrack();
    if(!track) return;

    // Get the mode
    const mode = appContext.currentTool;    
    if(mode == ToolTypes.mouse) {
      track.selectRegion(event);
    }

  }

  // Handle the canvas hover
  function canvasMouseMove(event) {
    if(!trackDrawer) {
      return;
    }

    if (!trackDrawer.is_dragging) {
      return trackDrawer.handleHover(event);
    }


  }

  // Handle mouse down
  function canvasMouseDown(event) {
    if(trackDrawer) {
    }
  }

  function canvasMouseUp(event) {
    if(!trackDrawer) {
      return;
    }


  }

  return <canvas 
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
}

export default TracksLayer