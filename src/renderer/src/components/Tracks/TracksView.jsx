import React, { useContext, useEffect, useState } from 'react'
import TrackController from './TrackController';
import { AppContext } from '../../App';

const TracksView = () => {

  const { projectContext } = useContext(AppContext);
  const project = projectContext.project;
  const tracks = project.tracks().getTracks(true);
  const [selected, setSelected] = useState(project.tracks().getSelectedTrack())

  // Track selection
  function selectTrack(id) {
    project.tracks().setSelectedTrack(id);
    setSelected(id);
  }

  // Automatically select a track that is newly added
  useEffect(() => {
    setSelected(project.tracks().getSelectedTrack());
  }, [project.tracks().getSelectedTrack()])

  
  // Draw the component
  return (
    <div className='h-full bg-gray-800 w-1/6 flex flex-col'>
      {tracks.map((track, index) => <TrackController data={track} key={index} selected={selected} onClick={() => selectTrack(track.id)}/>)}
    </div>
  )
}

export default TracksView