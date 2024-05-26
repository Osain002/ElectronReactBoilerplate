import ArrayExtractor from "../../../Core/Arrays/ArrayExtractor";
import TracksManager from "../../Tracks/TracksManager";
import CanvasDrawer from "../Base/CanvasDrawer";

class RegionDrawer extends CanvasDrawer {
  
  constructor(initialised_canvas) {
    super(initialised_canvas);

    // The region outlines
    this._outline_width = 1;
    this._outline_selected_width = 5;

  }

  // Draw the regions
  drawRegions(tracks) {

    tracks = tracks.getTracksObject();
    this.clear();
    
    // Get through the regions
    let regions = [];
    for(let track in tracks) {
      regions = regions.concat(tracks[track].regions);
    }

    // Draw all the regions
    for(let region of regions) {
      this.drawEmptyRegion(region.drawing_data, region.selected);
    }    
  }

  // Draw an empty region
  drawEmptyRegion(drawing_data, selected) {

    // Check if this region is selected
    let line_width = this._outline_width;
    if(selected) {
      line_width = this._outline_selected_width;
    }

    return this.draw_rectangle(
      drawing_data.x, 
      drawing_data.y, 
      drawing_data.width, 
      drawing_data.height, 
      'black', 
      drawing_data.colour, 
      line_width
    );
  }
}

export default RegionDrawer;