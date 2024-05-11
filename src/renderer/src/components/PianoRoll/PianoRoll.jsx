import React, { useRef, useEffect } from 'react';
import PianoRollDrawer from '../../Kernel/PianoRoll/PianoRollDrawer';

const PianoRoll = ({track, region}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const piano_drawer = new PianoRollDrawer(region, canvas);
    
  }, []); // Make sure to pass an empty dependency array to only run this effect once

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default PianoRoll;
