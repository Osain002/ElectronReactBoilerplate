// ===========================================================
//
// This is a reusable overlay component
//
// ===========================================================
import React from 'react';
// ===========================================================

const Overlay = ({ classes, showCloseButton, showOverlay, setShowOverlay, children }) => {
  return (
    <div className={`fixed inset-0 ${showOverlay ? 'block' : 'hidden'} bg-black bg-opacity-50 z-50 flex justify-center items-center`}>
      {/* Close button */}
      {showCloseButton && <button className="absolute top-0 right-0 p-2 focus:outline-none" onClick={() => setShowOverlay(false)}>
        <svg className="w-6 h-6 text-red hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>}
      <div className={"bg-gray-800 rounded-lg shadow-lg p-8 bg-slate-600 " + classes}>
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Overlay;
