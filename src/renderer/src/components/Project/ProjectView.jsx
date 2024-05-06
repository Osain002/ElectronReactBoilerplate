import React, { useRef, useEffect, useContext } from 'react';
import GridBuilder from '../../Core/Canvas/GridBuilder';
import { AppContext } from '../../App';
import { useContainerDimensions } from '../../Core/Hooks/dimensions';

const ProjectView = () => {

  // Get the context
  const {projectContext} = useContext(AppContext);

  // Create a ref to hold the reference to the canvas element
  const gridCanvasRef = useRef(null);
  const positionCanvasRef = useRef(null);
  const containerRef = useRef()

  useEffect(() => {
    // Access the canvas element using the ref
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    
    // Set the canvas width and height to match its container
    canvas.width = 2*canvas.offsetWidth;
    canvas.height = 2*canvas.offsetHeight;
    
    // Make the grid
    const grid_builder = new GridBuilder(canvas, projectContext.gridType);
    grid_builder.draw_grid_verticals();
  }, []);

  useEffect(() => {
    // Access the canvas element using the ref
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    
    const grid_builder = new GridBuilder(canvas, projectContext.gridType);
    grid_builder.draw_track_lines(projectContext.project.num_tracks);
  }, [projectContext.project.num_tracks])

  return (
    <div className='w-5/6 h-full overflow-x-scroll' style={{ position: 'relative' }} >
      <div style={{width: '200%', height: '100%'}}ref={containerRef}>
        <canvas ref={gridCanvasRef} className='absolute top-0 left-0 h-full' style={{minWidth: '200rem'}}/>
        <canvas ref={positionCanvasRef} className='absolute top-0 left-0 h-full' style={{minWidth: '200rem'}}/>

      </div>
    </div>
  );
};

export default ProjectView;
