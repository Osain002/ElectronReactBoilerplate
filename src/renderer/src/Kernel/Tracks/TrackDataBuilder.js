//==========================================================
//
// This class builds the track data objects
//
//==========================================================

class TrackDataBuilder {

  constructor(manager, id) {
    this.manager = manager;
    this.track_data = {
      
      // Track information
      id: id,
      name: "Untitled Track",
      type: null,
      
      // Data for drawing the track
      drawing_data: {
        colour: "#FFFFF",
        height: 80
      },

      // The regions
      regions: []
    };
  }

  // Set the type
  setType(type) {
    this.track_data.type = type;
    return this;
  }

  // Set the name
  setName(name) {
    this.track_data.name = name;
    return this;
  }

  // Set the colour
  setColour(colour) {
    this.track_data.drawing_data.colour = colour;
    return this;
  }

  // Set any extra data
  setExtraData(key, data) {
    this.track_data.key = data;
    return this;
  }

  // Set the height
  setHeight(height) {
    this.track_data.drawing_data.height = height;
    return this;
  }
  // Add the track to the track manager
  add() {
    return this.manager.addTrack(this.track_data);
  }
}

export default TrackDataBuilder;