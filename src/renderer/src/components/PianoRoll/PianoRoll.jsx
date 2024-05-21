// import React, { useRef, useEffect } from 'react';
// import PianoRollDrawer from '../../Kernel/PianoRoll/PianoRollDrawer';
// import Overlay from '../../Core/components/OverlayBase/Overlay';
// import Notes from '../../Kernel/PianoRoll/Notes';
// import CanvasManager from '../../Core/Canvas/CanvasManager';

// const PianoRoll = ({showPianoRoll, setShowPianoRoll, track}) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {

//     // Make sure we have a track
//     if(!track || !showPianoRoll) {
//       return;
//     }
//     console.log(track)
    
//     // Get the canvas
//     const canvas = canvasRef.current;
//     if(!canvas) {
//       return;
//     }

//     // Add the canvas to the canvas manager
//     CanvasManager.addCanvas('pianoRoll', canvas);

//     // Draw the piano roll
//     const keys = Notes.getKeys();
//     const piano_drawer = new PianoRollDrawer(track.selected_region);
    

//   }, [track, showPianoRoll]); // Make sure to pass an empty dependency array to only run this effect once

//   return (
//     <Overlay showOverlay={showPianoRoll} setShowOverlay={setShowPianoRoll} classes={"w-screen h-4/5 overflow-y-scroll"}>
//       <div className='flex flex-row w-full'>
//         <div className=''>
//           {Notes.getKeys().map((note) => <div className='border border-bottom-black text-xs'>{note.note}</div>)}
//         </div>
//         <div className='border w-full'>
//           <canvas ref={canvasRef} width={800} height={600} className='w-full h-full overflow-x-scroll'/>
//         </div>
//       </div>
//     </Overlay>
//   );
// };

// export default PianoRoll;

