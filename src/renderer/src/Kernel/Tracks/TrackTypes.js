
const trackTypes = {

  AUDIO: 1,
  VIRTUAL_INST: 2,

  to_string: function(type) {
    switch(type) {
      case trackTypes.AUDIO: return "Audio";
      case trackTypes.VIRTUAL_INST: return "Virtual Instrument";
    }
  },

  to_array: function() {
    return [
      trackTypes.AUDIO, 
      trackTypes.VIRTUAL_INST
    ]
  }
}

export default trackTypes;