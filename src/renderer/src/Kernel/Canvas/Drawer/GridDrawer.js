import CanvasDrawer from "../Base/CanvasDrawer";

class GridDrawer extends CanvasDrawer {

  constructor(initialised_canvas) {
    super(initialised_canvas);

    this.zoom_x = 1;
    this.division_length = 20;

    // Settings
    // TODO link this to the form
    this.time_signature = {numerator: 4, denominator: 4};
    this.tracks = [];

  }

  // Draw the time signature grid
  drawGridVerticals(total_beats, bar_length) {

    // If a total number of beats has not been specified
    if(!total_beats) {
      total_beats = Math.floor(this.canvas.width/this.division_length);
    }

    if(!bar_length) {
      bar_length = this.time_signature.numerator;
    }

    for(let i=0; i<total_beats; i++) {

      // Get the top and bottom coordinates 
      let grid_top = {x: i*this.division_length, y: 0};
      let grid_bottom = {x: i*this.division_length, y: this.canvas.height};

      // Use the time signature to decide the line thickness
      let line_width = 0.3;
      if(i % bar_length == 0) {
        line_width = 0.7;
      }


      // Draw the lines
      this.draw_line_between(grid_top, grid_bottom, line_width)
    }

  }

  // Draw the track horizontals
  drawHorizontalLines(num_lines, height=80) {
    for(let i=1; i<=num_lines; i++) {
      let grid_left = {x: 0, y: height*i};
      let grid_right = {x: this.canvas.width, y: height*i};
      this.draw_line_between(grid_left, grid_right, 0.3)
    }
  }

  // Get the division pixel length
  getCanvasWidthFromDivisions(num_divisions) {
    return this.division_length * num_divisions;
  }

}

export default GridDrawer;