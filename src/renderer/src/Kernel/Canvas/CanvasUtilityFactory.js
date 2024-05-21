import GridDrawer from "./Drawer/GridDrawer";
import RegionDrawer from "./Drawer/RegionDrawer";

import canvasTypes from "./CanvasTypes";
import GridCanvasEventHandler from "./EventHandlers/GridCanvasEventHandler";
import RegionCanvasEventHandler from "./EventHandlers/RegionCanvasEventHandler";

class CanvasUtilityFactory {

  // Get a canvas event handler
  static getEventHandler(type, initialised_canvas) {
    if (type == canvasTypes.grid) {
      return new GridCanvasEventHandler(initialised_canvas);
    } else if (type == canvasTypes.track) {
      return new RegionCanvasEventHandler(initialised_canvas);
    }
  }

  // Get a drawer
  static getDrawer(type, initialised_canvas) {
    if (type == canvasTypes.grid) {
      return new GridDrawer(initialised_canvas);
    } else if (type == canvasTypes.track) {
      return new RegionDrawer(initialised_canvas);
    }
  }

}

export default CanvasUtilityFactory;