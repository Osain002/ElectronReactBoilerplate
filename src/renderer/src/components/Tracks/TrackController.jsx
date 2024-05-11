import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';

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


const TrackController = ({ data, onClick, selected }) => {

  // Get the project
  const { projectContext } = useContext(AppContext);
  const project = projectContext.project;

  const [highlight, setHighlight] = useState("bg-gray-800")

  // Highlight this track if it is selected
  useEffect(() => {
    if(selected == data.id) {
      setHighlight("bg-gray-600")
    } else {
      setHighlight("bg-gray-800")
    }
  }, [selected]);

  return (
    <div 
      className={"flex items-center justify-between p-4 max-h-10 border-b text-white track_controller " + highlight }
      onClick={onClick}
    >
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