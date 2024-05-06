import React, { useContext } from 'react'
import TrackController from './TrackController';
import { AppContext } from '../../App';

const TracksView = () => {

  const { projectContext } = useContext(AppContext);

  return (
    <div className='h-full bg-gray-800 w-1/6 flex flex-col'>
      {
        projectContext.project.getTracks().map((track, index) => <TrackController data={track} key={index}/>)
      }
    </div>
  )
}

export default TracksView