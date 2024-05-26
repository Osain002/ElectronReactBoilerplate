import React, { useContext, useEffect, useRef, useState } from 'react';
import Notes from "../../Kernel/PianoRoll/Notes";
import CanvasManager from '../../Kernel/Canvas/CanvasManager';
import canvasTypes from '../../Kernel/Canvas/CanvasTypes';
import { ToolForm } from '../Forms/TransportForm';
import { canvasClick, canvasDoubleClick, canvasMouseDown, canvasMouseMove, canvasMouseUp } from '../../Kernel/PianoRoll/PianoRollRegionsFunctions';
import { AppContext } from '../../App';

const PianoRoll = ({ data }) => {

  // Get the context
  const { projectContext, appContext } = useContext(AppContext);
  // const project = projectContext.project;

  const [canvasWidth, setCanvasWidth] = useState(0);

  const gridCanvasRef = useRef(null);
  const regionCanvasRef = useRef(null);

  // const tracks = projectContext.project.tracks();
  const notes = new Notes();

  console.log(Notes._keys)
  useEffect(() => {
    
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    
    // Redraw the grid
    const num_divisions = data.region.width*16;
    let bundle = CanvasManager.addCanvas(canvasTypes.grid, canvas, canvasTypes.piano_grid);
    
    // Get the pixel width of the canvas
    let px_width = bundle.drawer.getCanvasWidthFromDivisions(num_divisions);
    bundle.drawer.canvas.updateWidth(px_width)
    setCanvasWidth(px_width);

    // Draw the grid
    bundle.drawer.drawHorizontalLines(88, 12);
    bundle.drawer.drawGridVerticals(num_divisions, 16);

    // Setup the region drawing
    let region_canvas = regionCanvasRef.current;
    if (!region_canvas) return;
    bundle = CanvasManager.addCanvas(canvasTypes.track, region_canvas, canvasTypes.piano_regions);
    bundle.drawer.canvas.updateWidth(px_width)
    bundle.drawer.drawRegions(notes);

  }, []);

  return (
    <div className='h-full'>
      <div className='overflow-y-scroll' style={{maxHeight: '90%'}}>
        <div className='h-fit flex flex-row'>
          <div className='w-min-content h-fit' style={{fontSize: '10px'}}>
            {notes.getTracks(true).map(note => (
              <div key={note.id} className="w-fit" style={{height: '12px'}}>{note.name}</div>
            ))}
          </div>
          <div className='border w-fit flex-grow overflow-x-scroll' style={{height: '1056px', position: 'relative'}}>
            <canvas 
              ref={gridCanvasRef} 
              height={1056} 
              className='h-full' 
              style={{ 
                width: canvasWidth + 'px',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1 
              }} 
            />
            <canvas 
              ref={regionCanvasRef} 
              height={1056} 
              className='h-full' 
              style={{ 
                width: canvasWidth + 'px',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2 
              }}
              onDoubleClick={(event) => canvasDoubleClick(notes, appContext.currentTool, event)}
              onClick={(event) => canvasClick(notes, appContext.currentTool, event)}
              onMouseDown={(event) => canvasMouseDown(notes, appContext.currentTool, event)}
              onMouseMove={(event) => canvasMouseMove(notes, appContext.currentTool, event)}
              onMouseUp={(event) => canvasMouseUp(notes, appContext.currentTool, event)}
            />
          </div>
        </div>
      </div>
      <div className='margin-auto border' style={{height: '10%'}}>
        <ToolForm />
      </div>
    </div>
  );
}

export default PianoRoll;
