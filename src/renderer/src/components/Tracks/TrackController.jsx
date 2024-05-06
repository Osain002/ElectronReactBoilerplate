import React, { useState } from 'react';

const Slider = () => {
  const [value, setValue] = useState(50);

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={handleSliderChange}
      className="slider w-1/2"
    />
  );
};


const TrackController = ({ data }) => {

  return (
    <div className="flex items-center justify-between p-4 max-h-10 border-b bg-gray-800 text-white track_controller">
      <div className="flex items-center w-1/2">
        <h3 className="text-sm font-semibold">{data.name}</h3>
      </div>
      <div className="flex items-center">
          <Slider />
      </div>
    </div>
  );
};

export default TrackController;
