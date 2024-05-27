import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { Select } from '../../Core/components/Forms/BasicFormFields';
import InstrumentTypes from '../../Kernel/Instruments/InstrumentTypes';
import trackTypes from '../../Kernel/Tracks/TrackTypes';

const Slider = () => {
  const [value, setValue] = useState(50);

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex items-center h-64 rotate-90 p-0 w-10 fixed bottom-0 w-20">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleSliderChange}
        className="slider transform rotate-180 border h-10 "
        style={{ transformOrigin: 'center', left: '50%' }}
      />
    </div>
  );
};

const PluginsArea = ({ data }) => {

  const [numPlugins, setNumPlugins] = useState(4);

  return (
    <div>
      {(data.type == trackTypes.VIRTUAL_INST) 
        && <Select 
          options={InstrumentTypes} 
          emptyByDefault
        />
      } 
    </div>
  )
}


const MixerColumn = ({ data, onClick, selected }) => {
  console.log(data);
  // Get the project
  const { projectContext } = useContext(AppContext);
  const project = projectContext.project;

  const [highlight, setHighlight] = useState("bg-gray-800")

  // Highlight this track if it is selected
  useEffect(() => {
    if(selected && selected.id == data.id) {
      setHighlight("bg-gray-600")
    } else {
      setHighlight("bg-gray-800")
    }
  }, [selected]);

  return (
    <div 
      className={"flex flex-col h-full text-black " + highlight }
      onClick={onClick}
    >
      <div className="flex items-center w-20" style={{backgroundColor: data.drawing_data.colour}}>
        <h3 className="text-xs font-semibold m-auto">{data.name}</h3>
      </div>
      <div className='border'>
        <PluginsArea data={data}/>
      </div>
      <div className="flex items-center border w-full h-full">
        <Slider />
      </div>
    </div>
  );
};

export default MixerColumn;
