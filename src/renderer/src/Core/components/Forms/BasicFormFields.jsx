import React from 'react';
import { AiOutlineSearch } from "react-icons/ai";

const Input = ({ label, type, required, onChange }) => {
  return (
    <div className="flex flex-row items-center mb-4">
      <div className="w-fit flex items-end justify-end">
        {label && <label className="justify-start text-white mr-2 text-sm">{label}{required ? <span className="text-red-500">*</span> : ""}</label>}
      </div>
      <div className='max-w-full'>
        <input className=" w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-800 border-slate-400 " type={type} onChange={onChange}/>
      </div>
    </div>
  );
};

export const TextInput = ({label, required, onChange}) => {
  return <Input label={label} required={required} onChange={onChange} />
} 

export const NumberInput = ({ label, step, required, onChange, default_value }) => {
  return (
    <div className="flex flex-row items-center">
      {label && <label className="w-fit mr-2 text-xs">{label}{required ? <span className="text-red-500">*</span> : ""} </label>}
      <input className="border border-gray-300 rounded-md w-32 focus:outline-none focus:border-blue-500 bg-slate-800 border-slate-500 text-sm pl-1" type="number" step={step} onChange={onChange} defaultValue={default_value}/>
    </div>
  );
};

export const TextArea = ({ label, required, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="font-bold mb-2">{label}{required ? <span className="text-red-500">*</span> : ""}</label>}
      <textarea className="border border-gray-300 rounded-md p-1 w-64 h-24 focus:outline-none focus:border-blue-500 bg-slate-300 border-slate-400" onChange={onChange}></textarea>
    </div>
  );
};

export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center mb-4">
      <input type="checkbox" className="form-checkbox border-gray-300 rounded text-blue-500 focus:ring-blue-500" checked={checked} onChange={onChange} />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export const RadioGroup = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="font-bold mb-2">{label}</label>}
      {options.map(option => (
        <label key={option.value} className="flex items-center">
          <input type="radio" className="form-radio border-gray-300 rounded text-blue-500 focus:ring-blue-500" value={option.value} checked={selectedValue === option.value} onChange={onChange} />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

const Select = ({ label, options, onChange, required, containerClasses, emptyByDefault}) => {
  return (
    <div className={"flex flex-row items-center mb-1" + containerClasses}>
      {label && <label className="w-fit mr-2 text-white text-xs">{label}{required ? <span className="text-red-500">*</span> : ""} </label>}
      <select className="border border-gray-300 rounded-md w-64 focus:outline-none focus:border-blue-500 bg-slate-800 border-slate-400 w-fit text-sm" onChange={onChange}>
        {!emptyByDefault ?? <option disabled selected hidden>Select</option>}
        {options.to_array().map(option => (
          <option key={option} value={option}>{options.to_string(option)}</option>
        ))}
      </select>
    </div>
  );
};

const Submit = ({ text, className }) => {
  return (
    <div className={className}>
      <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4" type="submit" value={text} />
    </div>
  );
};

const SearchBar = ({ placeholder, onChange, className }) => {
  return (
    <div className={"relative items-center mb-4 " + className}>
      <input className="border border-gray-200 rounded-lg p-1 pr-8 w-64 focus:outline-none focus:border-blue-500 bg-slate-200 border-slate-400 w-full" type="text" placeholder={placeholder} onChange={onChange}/>
      <div className="absolute right-2 top-2 text-gray-400"><AiOutlineSearch /></div>
    </div>
  );
};

export { Input, Select, Submit, SearchBar };
