import CanvasUtilityFactory from "../../Kernel/Canvas/CanvasUtilityFactory";

class CanvasInitialiser {

  constructor(canvas) {
    this.canvas = canvas;
    this.pixel_density = 1
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.width = canvas.width;
    this.height = canvas.height;
  }
  
  // Get the context
  context() {
    return this.ctx;
  } 

  // Get the bounding client rectangle
  boundingRect() {
    return this.canvas.getBoundingClientRect();
  }
  
  // Setup pixel density
  set_density() {
    let pixel_width = this.canvas.width;
    let css_width = this.canvas.style.width;
    let density = pixel_width/css_width;
    if(!density || density == Infinity) {
      return 1;
    }
    return pixel_width/css_width;
  }

  // Get the pixel width
  get_dimensions() {
    return {
      width: this.width,
      height: this.height
    };
  }

  updateWidth(width) {
    this.width = width;
    this.canvas.width = width;
  }

  // Set width and height
  set_dimensions(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  // Set the cursor type
  setCursor(type) {
    this.canvas.style.cursor = type;
  }

  // Return a drawer and event handler
  init(type) {
    return {
      eventAdapter: CanvasUtilityFactory.getEventHandler(type, this),
      drawer: CanvasUtilityFactory.getDrawer(type, this)
    }
  }
  
}

export default CanvasInitialiser;