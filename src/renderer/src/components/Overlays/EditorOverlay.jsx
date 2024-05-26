import React from 'react'
import Overlay from '../../Core/components/OverlayBase/Overlay'
import PianoRoll from '../PianoRoll/PianoRoll'
import { EditorTypes } from '../../Kernel/Utils/EditorTypes'


const InvalidEditor = ({type}) => {
  return (
    <div>
      <p>Invalid form type in FormFactory {type} </p>
    </div>
  )
}

const EditorOverlayFactory = ({data, type}) => {
  switch(type) {
    case EditorTypes.pianoRoll: return <PianoRoll data={data}/>
    default: return <InvalidEditor type={type} />
  }
}

const EditorOverlay = ({data, showOverlay, setShowOverlay}) => {
  if(!showOverlay || !data) {
    return;
  }
  return (
    <Overlay showOverlay={showOverlay} setShowOverlay={setShowOverlay} classes={"w-screen h-4/5"}>
      <EditorOverlayFactory data={data} type={data.editor}/>
    </Overlay>
  )
}

export default EditorOverlay