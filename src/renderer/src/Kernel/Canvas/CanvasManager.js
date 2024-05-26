//=================================================================
//
// This class manages the various canvases
//
//=================================================================
//=================================================================

import CanvasInitialiser from "./CanvasInitialiser";

class CanvasManager {

  // Add a new canvas
  static addCanvas(type, canvas, key) {
    
    if(!key) {
      key = type;
    }

    let init_canvas = new CanvasInitialiser(canvas).init(type);
    CanvasManager.canvases[key] = init_canvas;
    return init_canvas;
  }

  // Get a canvas
  static getCanvas(key) {
    return CanvasManager.canvases[key]
  }

  // Get the event handler for a canvas
  static getEventHandler(key) {
    return CanvasManager.canvases[key].eventHandler;
  }

  // Object to store the canvases
  static canvases = {};
}

export default CanvasManager;