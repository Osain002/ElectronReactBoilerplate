import React, { useEffect, useRef, useState } from 'react';
import Notes from "../../Kernel/PianoRoll/Notes";
import CanvasManager from '../../Kernel/Canvas/CanvasManager';
import canvasTypes from '../../Kernel/Canvas/CanvasTypes';

const PianoRoll = ({ data }) => {

  // Get the context
  // const { projectContext } = useContext(AppContext);
  // const project = projectContext.project;

  const [notesArr, setNotesArr] = useState([]);
  const [canvasBundle, setCanvasBundle] = useState();
  const [canvasWidth, setCanvasWidth] = useState(0);

  const gridCanvasRef = useRef(null);
  // const tracks = projectContext.project.tracks();

  useEffect(() => {
    
    const notes = new Notes();
    setNotesArr(notes.getTracks(true).reverse());

    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    
    // Redraw the grid
    const num_divisions = data.region.width*16;
    const bundle = CanvasManager.addCanvas(canvasTypes.grid, canvas, canvasTypes.piano_grid);
    
    let px_width = bundle.drawer.getCanvasWidthFromDivisions(num_divisions);
    bundle.drawer.canvas.updateWidth(px_width)
    setCanvasWidth(px_width);

    bundle.drawer.drawHorizontalLines(88, 12);
    bundle.drawer.drawGridVerticals(num_divisions, 16);
  }, []);


  return (
    <div className='h-full'>
      <div className='overflow-y-scroll' style={{maxHeight: '90%'}}>
        <div className='h-fit flex flex-row'>
          <div className='w-fit flex-grow h-fit' style={{fontSize: '10px'}}>
            {notesArr.map(note => (
              <div key={note.id} style={{height: '12px'}}>{note.name}</div>
            ))}
          </div>
          <div className='border w-fit flex-grow' style={{height: '1056px'}}>
            <canvas ref={gridCanvasRef} height={1056} className='h-full' style={{width: canvasWidth + "px"}} />
          </div>
        </div>
      </div>
      <div className='margin-auto border' style={{height: '10%'}}></div>
    </div>
  );
}

export default PianoRoll;
