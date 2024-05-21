
class GridBuilder {

  constructor(drawer) {

    this.drawer = drawer;    
    this.zoom_x = 1;
    this.beat_length_px = 20;

    // Settings
    // TODO link this to the form
    this.time_signature = {numerator: 4, denominator: 4};
    this.tracks = [];

  }

  // Draw the time signature grid
  draw_grid_verticals() {

    let total_beats = Math.floor(this.drawer.canvas.width/this.beat_length_px);

    for(let i=0; i<total_beats; i++) {

      // Get the top and bottom coordinates 
      let grid_top = {x: i*this.beat_length_px, y: 0};
      let grid_bottom = {x: i*this.beat_length_px, y: this.drawer.canvas.height};

      // Use the time signature to decide the line thickness
      let line_width = 0.3;
      if(i % this.time_signature.numerator == 0) {
        line_width = 0.7;
      }

      // Draw the lines
      this.drawer.draw_line_between(grid_top, grid_bottom, line_width)
    }

  }

  // Draw the track horizontals
  draw_horizontal_lines(num_lines, height=80) {
    for(let i=1; i<=num_lines; i++) {
      let grid_left = {x: 0, y: height*i};
      let grid_right = {x: this.drawer.canvas.width, y: height*i};
      this.drawer.draw_line_between(grid_left, grid_right, 0.3)
    }
  }

}

export default GridBuilder;