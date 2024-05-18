import React, { useRef, useEffect, useContext, useState } from 'react';
import GridBuilder from '../../Core/Canvas/GridBuilder';
import { AppContext } from '../../App';
import TracksLayer from './TracksLayer';
import CanvasManager from '../../Core/Canvas/CanvasManager';
import canvasTypes from '../../Core/Canvas/CanvasTypes';

const ProjectView = () => {

  // Store the current canvas width
  const [canvasWidth, setCanvasWidth] = useState(5000);
  const [pxWidth, setPxWidth] = useState(0);
  const [pxHeight, setPxHeight] = useState(0);


  // Get the context
  const { projectContext } = useContext(AppContext);
  const project = projectContext.project;

  // Create refs to hold the references to the canvas elements and container
  const gridCanvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to update canvas dimensions and redraw the grid
    const updateCanvas = () => {
      const canvas = gridCanvasRef.current;
      if (!canvas) return;

      // Update canvas dimensions to match container
      canvas.width = 2 * containerRef.current.offsetWidth;
      canvas.height = 2 * containerRef.current.offsetHeight;

      setPxWidth(canvas.width);
      setPxHeight(canvas.height);

      CanvasManager.addCanvas(canvasTypes.grid, canvas);

      // Redraw the grid
      const grid_builder = new GridBuilder();
      grid_builder.draw_grid_verticals();
      grid_builder.draw_horizontal_lines(project.tracks().getNumTracks());
    };

    // Call updateCanvas initially
    updateCanvas();

    // Attach event listener for window resize
    window.addEventListener('resize', updateCanvas);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', updateCanvas);
    };
  }, [projectContext]);

  return (
    <div className='w-5/6 h-full overflow-x-scroll' style={{ position: 'relative' }}>
      <div style={{ width: canvasWidth + 'px', height: '100%' }} ref={containerRef}>
        {/* Grid Canvas */}
        <canvas ref={gridCanvasRef} className='absolute top-0 left-0 h-full' style={{ width: canvasWidth + 'px' }} />

        {/* Track layer */}
        <TracksLayer width={canvasWidth} pxWidth={pxWidth} pxHeight={pxHeight}/>
      </div>
    </div>
  );
};

export default ProjectView;
