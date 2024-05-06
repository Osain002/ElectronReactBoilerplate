import React, { useContext, useState } from 'react'
import { Select, Submit, TextInput } from '../../Core/components/Forms/BasicFormFields'
import trackTypes from '../../Kernel/Tracks/TrackTypes';
import { AppContext } from '../../App';
import Track from '../../Kernel/Tracks/Track';

const NewTrackForm = () => {

  // Get the track dispatcher
  const { projectContext, appContext } = useContext(AppContext);

  // Form value state holders
  const [trackName, setTrackName] = useState("Untitled Track");
  const [trackType, setTrackType] = useState(null);

  // Add the new track
  function submit(e) {

    // Create a new empty track
    e.preventDefault();
    const track_id = projectContext.project.num_tracks;
    const track = new Track(track_id, trackName, trackType);

    // Add the track
    projectContext.trackDispatch({
      type: "new",
      track: track
    });

    // Close the overlay
    appContext.setShowOverlay(false);
  }

  return (
    <div className='text-center'>
      <h3 className='text-xl mb-4 font-bold'>New Track</h3>
      <form onSubmit={submit}>
        <TextInput label={"Track Name"} required={false} onChange={e => setTrackName(e.target.value)}/>
        <Select label={"Track Type"} required={true} options={trackTypes} onChange={e => setTrackType(e.target.value)}/>
        <Submit text={"Add"}/>
      </form>
    </div>
  )
}

export default NewTrackForm