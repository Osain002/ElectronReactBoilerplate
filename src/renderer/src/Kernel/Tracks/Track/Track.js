
class TrackBase {

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.colour = '#FFFFF';
    this.regions = [];
    this.selected_region = null;
  }

  //==== Setup
  
  // Set the track colour
  setColour(colour) {
    this.colour = colour;
  }

  //==== Regions

  // Get a single region 
  getRegion(id) {
    return this.regions[id];
  }

  // Get the regions 
  getRegions() {
    return this.regions;
  }

  // Get region between at this point
  getRegionAt(position) {
    for(let region of this.regions) {
      if(region.start < position && region.end > position) {
        return region
      }
    }
    return null;
  }

  // Set the selected region
  setSelectedRegion(id) {
    this.selected_region = this.regions[id];
  }

  // Update a region
  updateCurrentRegion() {
    this.regions[this.selected_region.id] = this.selected_region;
  }


}

export default TrackBase;