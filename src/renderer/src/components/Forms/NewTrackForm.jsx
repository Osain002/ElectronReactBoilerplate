import React, { useContext, useState } from 'react'
import { Select, Submit, TextInput } from '../../Core/components/Forms/BasicFormFields'
import trackTypes from '../../Kernel/Tracks/TrackTypes';
import { AppContext } from '../../App';
import ColorPicker from '../../Core/components/Forms/ColorPicker';

const NewTrackForm = () => {

  // Get the track dispatcher
  const { projectContext, appContext } = useContext(AppContext);
  const project = projectContext.project;

  // Form value state holders
  const [trackName, setTrackName] = useState("Untitled Track");
  const [trackType, setTrackType] = useState(null);
  const [colour, setColour] = useState("")

  // Add the new track
  function submit(e) {

    // Create a new empty track
    e.preventDefault();
    
    const tracks = projectContext.project.tracks();
    console.log(colour)
    tracks.getTrackBuilder()
      .setName(trackName)
      .setType(trackType)
      .setColour(colour)
      .add();
    
    console.log(tracks);

    // Close the overlay
    appContext.setShowOverlay(false);
  }

  return (
    <div className='text-center'>
      <h3 className='text-xl mb-4 font-bold'>New Track</h3>
      <form onSubmit={submit}>
        <TextInput label={"Track Name"} required={false} onChange={e => setTrackName(e.target.value)}/>
        <Select label={"Track Type"} required={true} options={trackTypes} onChange={e => setTrackType(e.target.value)}/>
        <ColorPicker label={"Colour"} onChange={setColour} />
        <Submit text={"Add"} />
      </form>
    </div>
  )
}

export default NewTrackForm