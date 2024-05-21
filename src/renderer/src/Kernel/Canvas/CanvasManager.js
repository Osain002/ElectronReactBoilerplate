//=================================================================
//
// This class manages the various canvases
//
//=================================================================
//=================================================================

import CanvasInitialiser from "./CanvasInitialiser";

class CanvasManager {

  // Add a new canvas
  static addCanvas(type, canvas) {
    let init_canvas = new CanvasInitialiser(canvas).init(type);
    CanvasManager.canvases[type] = init_canvas;
    return init_canvas;
  }

  // Get a canvas
  static getCanvas(type) {
    return CanvasManager.canvases[type]
  }

  // Get the event handler for a canvas
  static getEventHandler(type) {
    return CanvasManager.canvases[type].eventHandler;
  }

  // Object to store the canvases
  static canvases = {};
}

export default CanvasManager;