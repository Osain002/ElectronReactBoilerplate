

class CanvasDrawer {

  constructor(initialised_canvas) {
    this.canvas = initialised_canvas;
    this.ctx = this.canvas.context();
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

  // Draw a rectangle
  draw_rectangle(x, y, width, height, strokeColor = 'black', fillColor = 'transparent', lineWidth = 1) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.fillStyle = fillColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.rect(x, y, width, height);
    if (fillColor !== 'transparent') {
      this.ctx.fill();
    }
    this.ctx.stroke();
  }

}

export default CanvasDrawer