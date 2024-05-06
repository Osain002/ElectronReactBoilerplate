import React from 'react';
import { IoPlayOutline, IoPauseOutline, IoStopOutline } from 'react-icons/io5';
import { BsRecord } from 'react-icons/bs';
import TransportForm, { TimeSignatureForm } from '../Forms/TransportForm';

const TransportBar = () => {
  return (
    <div className="bg-zinc-600 w-full h-fit pt-2 pb-2 flex items-center">
      <div className="flex items-center justify-start pl-4 w-1/3">
        <TransportForm />
      </div>
      <div className='flex flex-row flex-grow justify-center w-1/3'>
        <BsRecord className="text-white text-xl mr-4" color='red'/>
        <IoStopOutline className="text-white text-xl mr-4" />
        <IoPauseOutline className="text-white text-xl mr-4" />
        <IoPlayOutline className="text-white text-xl mr-4" color='green'/>
      </div>
      <div className='w-1/3'>
        <TimeSignatureForm />
      </div>
    </div>
  );
};

export default TransportBar;
