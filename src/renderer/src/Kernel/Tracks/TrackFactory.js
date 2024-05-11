import AudioTrack from "./Track/AudioTrack";
import VirtualInstrumentTrack from "./Track/VirtualInstrumentTrack";
import trackTypes from "./TrackTypes";

// Create a track
export default function newTrack(type, id, name) {
  switch(parseInt(type)) {
    case trackTypes.VIRTUAL_INST: return new VirtualInstrumentTrack(id, name);
    case trackTypes.AUDIO: return new AudioTrack(id, name);
    default: return new AudioTrack(id, name);
  }
}