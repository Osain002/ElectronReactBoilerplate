import TrackCanvasConverter from "../../Utils/TrackCanvasConverter";
import CanvasEventHandler from "../Base/CanvasEventHandler";

class RegionCanvasEventHandler extends CanvasEventHandler {

  constructor(initialised_canvas) {
    super(initialised_canvas);
  }

  // Handle the mouse event
  mouseEvent(event, callback) {
    event.stopPropagation();
    let mouse_position = this.mouse_position(event);
    let converter = new TrackCanvasConverter(this.canvas)
    let x_position = converter.pxToTime(mouse_position.x);
    let track = converter.getTrack(mouse_position.y);
    return callback(x_position, track);
  }

}

export default RegionCanvasEventHandler;