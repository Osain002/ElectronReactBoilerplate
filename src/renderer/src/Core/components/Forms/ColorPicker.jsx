import React, { useEffect, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';

const Palette = ({ color, setColor, setShowPalette }) => {
  return (
    <div className="absolute top-0 left-0 z-10 p-4 bg-white border border-gray-300 rounded shadow">
      <HexColorPicker color={color} onChange={setColor} />
      <div className="mt-2 flex justify-end">
        <button
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => setShowPalette(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const ColorPicker = ({ label, onChange }) => {
  const [showPalette, setShowPalette] = useState(false);
  const [color, setColor] = useState('#FFFFFF');

  useEffect(() => {
    onChange(color);
  }, [color]);

  return (
    <div className="relative mt-4 mb-4">
      <div className="flex items-center">
        <label className="w-1/2">{label}</label>
        <div
          className="w-8 h-8 rounded cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setShowPalette(true)}
        ></div>
      </div>
      {showPalette && <Palette color={color} setColor={setColor} setShowPalette={setShowPalette} />}
    </div>
  );
};

export default ColorPicker;
