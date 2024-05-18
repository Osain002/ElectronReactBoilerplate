import { moveRegion, resizeRegion, selectRegion } from "../Regions/Region";

class TrackBase {

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.colour = '#FFFFF';
    this.regions = [];
    this.height = 80;
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
      let drawing_data = region.drawing_data;
      if(drawing_data.start < position && drawing_data.end > position) {
        return region
      }
    }
    return null;
  }

  // Set the selected region
  selectRegion(event, callback) {
    const region = selectRegion(this, event);
    this.selected_region = region;
    if(callback) {
      return callback(region);
    }
  }

  //==== Region editing

  // Resize region
  resizeRegion(event) {
    return resizeRegion(this, event);
  }

  // Move a region
  moveRegion(event) {
    return moveRegion(this, event)
  }

  // Update the selected region
  updateSelectedRegion() {

    // Get the id 
    if(!this.selected_region) {
      return;
    } 
    
    // Update the region in the array
    const id = this.selected_region.id
    this.regions[id] = this.selected_region;
  }

}

export default TrackBase;