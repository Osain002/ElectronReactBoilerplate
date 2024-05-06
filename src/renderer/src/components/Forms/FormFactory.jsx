import React from 'react'
import NewTrackForm from './NewTrackForm'

const InvalidForm = ({type}) => {
  return (
    <div>
      <p>Invalid form type in FormFactory {type} </p>
    </div>
  )
}

const FormFactory = ({type}) => {
  switch(type) {
    case 'new_track': return <NewTrackForm />
    default: return <InvalidForm type={type} />
  }
}

export default FormFactory