
class CanvasController {

  constructor(canvas) {
    this.points = {};
    this.canvas = canvas;
    this.pixel_density = this.set_density();
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  // Get the context
  context() {
    return this.ctx;
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

  // Set width and height
  set_dimensions(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  // Get click position on canvas
  mouse_position(e) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left)*this.pixel_density,
      y: (e.clientY - rect.top)*this.pixel_density
    };
  }

  // Clear the canvas and points 
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Start a line
  start_line(point, colour) {
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.strokeStyle = colour;
    this.ctx.moveTo(point.x, point.y);
  }

  // Add a point to the current line
  add_point_to_line(point) {
    this.ctx.lineTo(point.x, point.y);
  }

  // Draw a line between 2 points 
  draw_line_between(point_1, point_2, line_width=0.3) {
    this.ctx.lineWidth = line_width;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(point_1.x, point_1.y);
    this.ctx.lineTo(point_2.x, point_2.y);
    this.ctx.stroke();
  }

}

export default CanvasController;