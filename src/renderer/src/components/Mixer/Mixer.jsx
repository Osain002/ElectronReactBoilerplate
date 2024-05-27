import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import MixerColumn from './MixerColumn';

const Mixer = () => {
  const [height, setHeight] = useState('50%');

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

  

  return (
    <div className='w-full fixed bottom-0 left-0 right-0 bg-slate-500 flex flex-row' style={{height: height}}>
      {tracks.map((track, index) => <MixerColumn data={track} key={index} selected={selected} onClick={() => selectTrack(track.id)}/>)}
    </div>
  )
}

export default Mixer