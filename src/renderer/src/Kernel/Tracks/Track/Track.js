import TrackDrawer from "../Drawing/TrackDrawer";
import { selectRegion } from "../Regions/Region";

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
      let drawing_data = region.drawing_data;
      if(drawing_data.start < position && drawing_data.end > position) {
        return region
      }
    }
    return null;
  }

  // Set the selected region
  selectRegion(event) {
    const region_id = selectRegion(this, event);
    this.selected_region = this.regions[region_id];
  }

}

export default TrackBase;