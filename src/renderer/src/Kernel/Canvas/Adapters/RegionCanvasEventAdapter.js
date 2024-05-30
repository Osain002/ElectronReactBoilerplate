import Regions from "../../Regions/TrackRegions";
import Cursors from "../../Utils/Cursors";
import TrackCanvasConverter from "../../Utils/TrackCanvasConverter";
import CanvasEventAdapterBase from "../../../Core/Canvas/Base/CanvasEventAdapterBase";

class RegionCanvasEventAdapter extends CanvasEventAdapterBase {

  constructor(initialised_canvas) {
   super(initialised_canvas);
   this._is_dragging = false;
  }

  // Handle the mouse event
  mouseEvent(event, tracks, callback, to_nearest_division=false) {
    
    // Get the click position data
    event.stopPropagation();
    let mouse_position = this.mouse_position(event);
    let x_position = mouse_position.x;
    let track = TrackCanvasConverter.getTrack(tracks, mouse_position.y);

    // Check if we want to get the nearest beat to the click position
    if(to_nearest_division) {
      x_position = TrackCanvasConverter.pxToTime(x_position);
    }

    // Execute the callback
    return callback(x_position, track);
  }

  // Switch on dragging
  startDragging() {
    this._is_dragging = true;
  }

  // Switch off dragging
  stopDragging() {
    this._is_dragging = false;
  }

  // Get a cursor type
  setProximityCursor(proximity_type) {
    
    // Get the cursor type
    let cursor = Cursors.DEFAULT;
    let types = Regions.proximity_types;
    if (proximity_type == types.left_edge) {
      cursor = Cursors.RESIZE_HORIZONTAL;
    } else if (proximity_type == types.right_edge) {
      cursor = Cursors.RESIZE_HORIZONTAL;
    }

    // Set the cursor
    return this.canvas.setCursor(Cursors.getCursor(cursor));
  }

  
}

export default RegionCanvasEventAdapter;