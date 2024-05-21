

class CanvasEventHandler {

  constructor(initialised_canvas) {
    this.canvas = initialised_canvas;
  }

  // Handle a mouse event
  mouseEvent(event, callback) {}

  // Get click position on canvas
  mouse_position(event) {
    var rect = this.canvas.boundingRect(),
    scaleX = this.canvas.width / rect.width,  
    scaleY = this.canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY  
    }
  }

}

export default CanvasEventHandler;