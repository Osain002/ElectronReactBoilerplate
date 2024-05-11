import React, { useContext, useState } from 'react'
import { NumberInput, Select } from '../../Core/components/Forms/BasicFormFields'
import GridDivisions from '../../Kernel/ProjectView/GridDivisions'
import ToolTypes from '../../Kernel/ToolTypes'
import { FaMousePointer, FaPen } from "react-icons/fa";
import { AppContext } from '../../App';


const TransportForm = () => {
  return (
    <div className='flex flex-row' >
      <div className='pl-1 pr-8'>
        <NumberInput label="BPM" step={1} default_value={120}  />
      </div>
      <div>
        <Select label="Grid" options={GridDivisions} containerClasses="m-4" />
      </div>
    </div>
  )
}

export const TimeSignatureForm = () => {
  const [numerator, setNumerator] = useState(4); // Default value for numerator
  const [denominator, setDenominator] = useState(4); // Default value for denominator

  const numerators = [4, 8, 16, 32, 64]

  return (
    <div className='flex flex-row'>
      <input type="number" min={2} max={12} step={1} value={numerator} onChange={e => setNumerator(e.target.value)} />
      <p className='mr-2 ml-2'>/</p>
      <select onChange={e => setDenominator(e.target.value)}>
        { numerators.map(val => <option key={val} value={val}>{val}</option>) }
      </select>
    </div>
  );
};


export const ToolForm = () => {

  // Get the app context
  const { appContext } = useContext(AppContext);

  // Load the icons
  const icons = {
    [ToolTypes.mouse]: <FaMousePointer />,
    [ToolTypes.draw]: <FaPen />
  };

  // Build the toolbar
  return ( 
    <div className='flex flex-row'>
      {ToolTypes.toArray().map(tool => (
        <div
          key={tool}
          className={`ml-2 cursor-pointer ${tool === appContext.currentTool ? 'bg-black' : 'bg-transparent'}`}
          onClick={() => appContext.setTool(tool)}
        >
          {icons[tool]}
        </div>
      ))}
    </div>
  );
};


export default TransportForm