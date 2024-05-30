import React, { useState, useRef } from 'react';

const DraggableWindow = ({ onClose, children }) => {
  const windowRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 100, y: 100 });

  const handleMouseDown = (e) => {
    if (windowRef.current && windowRef.current.contains(e.target)) {
      setIsDragging(true);
      setInitialPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - initialPosition.x;
      const dy = e.clientY - initialPosition.y;
      setCurrentPosition({
        x: currentPosition.x + dx,
        y: currentPosition.y + dy,
      });
      setInitialPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="absolute bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
      ref={windowRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ zIndex:50, top: currentPosition.y, left: currentPosition.x, width: '300px', height: '200px', cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="flex justify-between items-center p-2 bg-gray-200 cursor-grab">
        <span className="text-lg font-bold">Draggable Window</span>
        <button className="text-xl" onClick={onClose}>×</button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
