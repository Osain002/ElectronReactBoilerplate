import React from 'react';
import { IoPlayOutline, IoPauseOutline, IoStopOutline } from 'react-icons/io5';
import { BsRecord } from 'react-icons/bs';
import TransportForm, { TimeSignatureForm, ToolForm } from '../Forms/TransportForm';

const TransportBar = () => {
  return (
    <div className="bg-zinc-600 w-full h-fit pt-2 pb-2 flex items-center justify-between">
      <div className="flex items-center justify-start pl-4 w-1/3">
        <TransportForm />
      </div>
      <div className="flex items-center justify-center w-1/3 space-x-4">
        <BsRecord className="text-white text-xl" color='red'/>
        <IoStopOutline className="text-white text-xl" />
        <IoPauseOutline className="text-white text-xl" />
        <IoPlayOutline className="text-white text-xl" color='green'/>
        <TimeSignatureForm />
      </div>
      <div className="flex items-center justify-end w-1/3 pr-4">
        <ToolForm />
      </div>
    </div>
  );
};

export default TransportBar;
