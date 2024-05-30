import React, { useRef, useEffect, useContext, useState } from 'react';
import { AppContext } from '../../App';
import TracksLayer from './TracksLayer';
import CanvasManager from '../../Core/Canvas/CanvasManager';
import canvasTypes from '../../Kernel/Canvas/CanvasTypes';

const ProjectView = () => {

  // Store the current canvas width
  const [canvasWidth, setCanvasWidth] = useState(5000);
  const [pxWidth, setPxWidth] = useState(null);
  const [pxHeight, setPxHeight] = useState(null);

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
      
      // Redraw the grid
      const bundle = CanvasManager.addCanvas(canvasTypes.grid, canvas);
      bundle.drawer.drawGridVerticals();
      bundle.drawer.drawHorizontalLines(project.tracks().trackCount());
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
    <>
      <div className='w-5/6 h-full overflow-x-scroll' style={{ position: 'relative' }}>
        <div style={{ width: canvasWidth + 'px', height: '100%' }} ref={containerRef}>
          {/* Grid Canvas */}
          <canvas ref={gridCanvasRef} className='absolute top-0 left-0 h-full' style={{ width: canvasWidth + 'px' }} />
    
          {/* Track layer */}
          {(pxWidth && pxHeight) && <TracksLayer width={canvasWidth} pxWidth={pxWidth} pxHeight={pxHeight}/>}
        </div>
      </div>
    </>
  );
};

export default ProjectView;
