//=================================================================
//
// This class manages the various canvases
//
//=================================================================
//=================================================================

class CanvasManager {

  // Add a new canvas
  static addCanvas(key, canvas) {
    CanvasManager.canvases[key] = canvas;
  }

  // Get a canvas
  static getCanvas(key) {
    return CanvasManager.canvases[key]
  }

  // Object to store the canvases
  static canvases = {};
}

export default CanvasManager;