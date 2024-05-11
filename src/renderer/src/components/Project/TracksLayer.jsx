import React, { useContext, useEffect, useRef, useState } from 'react'
import TrackDrawer from '../../Kernel/Tracks/Drawing/TrackDrawer';
import { AppContext } from '../../App';

const TracksLayer = ({width, pxWidth, pxHeight}) => {
  
  // Get the app context
  const { appContext } = useContext(AppContext);

  // Make a ref for the canvas
  const tracksCanvasRef = useRef(null);
  const [trackDrawer, setTrackDrawer] = useState(null);

  // Load the drawer
  useEffect(() => {

    // Get the canvas ref
    const canvas = tracksCanvasRef.current;
    if (!canvas) return;

    // Make the drawer
    const drawer = new TrackDrawer(canvas);
    drawer.redrawAllRegions();
    setTrackDrawer(drawer);
  }, []);
  

  // Handle tool switching 
  useEffect(() => {
    
    // Make sure the drawer is initialised
    if(!trackDrawer) return;

    trackDrawer.setMode(appContext.currentTool);

  }, [appContext.currentTool]);

  // Handle canvas double click
  function canvasDoubleClick(e) {
    if(!trackDrawer) return;
    trackDrawer.handleDoubleClick(e);
  }

  // Handle canvas click
  function canvasClick(e) {
    if(!trackDrawer) return;
    trackDrawer.handleClick(e);
  }

  // Handle the canvas hover
  function canvasMouseMove(e) {
    if(!trackDrawer) return;
    trackDrawer.handleMouseMove(e)
  }

  // Handle mouse down
  function canvasMouseDown(e) {
    if(!trackDrawer) return;
    trackDrawer.handleMouseDown(e)
  }

  function canvasMouseUp(e) {
    if(!trackDrawer) return;
    trackDrawer.handleMouseUp(e)
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