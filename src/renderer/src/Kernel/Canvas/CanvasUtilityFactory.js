import GridDrawer from "./Drawer/GridDrawer";
import RegionDrawer from "./Drawer/RegionDrawer";

import canvasTypes from "./CanvasTypes";
import GridCanvasEventAdapter from "./Adapters/GridCanvasEventAdapter";
import RegionCanvasEventAdapter from "./Adapters/RegionCanvasEventAdapter";
import CanvasUtilityFactoryBase from "../../Core/Canvas/Base/CanvasUtilityFactoryBase";

class CanvasUtilityFactory extends CanvasUtilityFactoryBase {

  // Get a canvas event handler
  static getEventHandler(type, initialised_canvas) {
    if (type == canvasTypes.grid) {
      return new GridCanvasEventAdapter(initialised_canvas);
    } else if (type == canvasTypes.track) {
      return new RegionCanvasEventAdapter(initialised_canvas);
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