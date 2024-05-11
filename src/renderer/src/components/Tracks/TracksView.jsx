import React, { useContext, useEffect, useState } from 'react'
import TrackController from './TrackController';
import { AppContext } from '../../App';

const TracksView = () => {

  const { projectContext } = useContext(AppContext);
  const project = projectContext.project;
  const [selected, setSelected] = useState(project.tracks().getSelectedTrack())

  // Track selection
  function selectTrack(id) {
    project.tracks().setSelectedTrack(id);
    setSelected(id);
  }

  return (
    <div className='h-full bg-gray-800 w-1/6 flex flex-col'>
      {
        project.tracks().getTracks().map((track, index) => <TrackController data={track} key={index} selected={selected} onClick={() => selectTrack(track.id)}/>)
      }
    </div>
  )
}

export default TracksView