
const InstrumentTypes = {
  
  // The virtual instruments
  piano: 1,
  guitar: 2,

  // Get string name
  to_string(type) {
    switch(type) {
      case InstrumentTypes.piano: return "Piano";
      case InstrumentTypes.guitar: return "Guitar";
      default: return "Invalid";
    }
  },

  to_array: function() {
    return [
      InstrumentTypes.piano,
      InstrumentTypes.guitar
    ]
  }
}

export default InstrumentTypes;