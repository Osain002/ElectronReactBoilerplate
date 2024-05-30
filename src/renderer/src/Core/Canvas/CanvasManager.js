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
    
    // If no key is explicitely set, use the type
    if(!key) {
      key = type;
    }

    // Initialise the canvas. The initialised canvas contains
    // a drawer and an event adapter
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
    return CanvasManager.canvases[key].eventAdapter;
  }

  // Object to store the canvases
  static canvases = {};
}

export default CanvasManager;