import React from 'react'
import Overlay from '../../Core/components/OverlayBase/Overlay'
import FormFactory from '../Forms/FormFactory'

const FormOverlay = ({type, showOverlay, setShowOverlay}) => {
  return (
    <Overlay showOverlay={showOverlay} setShowOverlay={setShowOverlay} showCloseButton={true}>
      <FormFactory type={type} />
    </Overlay>
  )
}

export default FormOverlay