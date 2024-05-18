import Project from "../../Kernel/Project/Project";
import ToolTypes from "../../Kernel/ToolTypes";
import trackTypes from "../../Kernel/Tracks/TrackTypes";
import CanvasManager from "./CanvasManager";
import canvasTypes from "./CanvasTypes";
import CanvasController from "./canvas_controller";


class RegionDrawerBase extends CanvasController {

  constructor() {

    super(CanvasManager.getCanvas(canvasTypes.track));

    // Setup
    this.project = new Project();
    this.current_mode = ToolTypes.mouse;
    this.beat_length_px = 20;

    // Edge tolerance
    this.edge_tolerance = 10;

    // TODO link this to the form
    this.time_signature = {numerator: 4, denominator: 4};

    this.dragging_modes = {
      resize: 1, 
      move: 2, 
    }

  }

  //==== Setup

  // Start dragging
  startDragging() {
    console.log('started dragging')
    TrackDrawer.dragging = true;
  }

  // Stop dragging
  stopDragging() {
    console.log('stopped dragging')
    TrackDrawer.previous_mouse_position = null;
    TrackDrawer.dragging = false;
  }

  //==== Event handlers

  // Handle hover
  handleMouseMove(e) {

    // If we are dragging
    if(TrackDrawer.dragging) {
      return this.handleDrag(e)
    }

    // Handle modes
    if (this.current_mode == ToolTypes.mouse) {
      return this.detectEdge(e);
    }
  }

  // Handle the hover
  handleHover(track, e) {
    if (this.current_mode == ToolTypes.mouse) {
      return this.detectEdge(track,e);
    }
  }

  // Handle dragging
  handleDrag(track, e) {
    if (TrackDrawer.dragging_mode == this.dragging_modes.resize) {
      return track.resizeRegion(e);
    } else if (TrackDrawer.dragging_mode == this.dragging_modes.move) {
      return track.moveRegion(e);
    }
  }

  //==== Regions

  // Draw a new region
  newRegion(track, event) {

    // Ensure this is a virtual instrument track
    if(track.type != trackTypes.VIRTUAL_INST) {
      return alert("Cannot create region on non virtual instrument track");
    }

    // Get the click position
    let mouse_position = this.mouse_position(event);

    // Get the nearest beat to snap to
    let beat = this.nearestBeat(mouse_position);

    // Get the region position
    let start_x = beat*this.beat_length_px;
    let start_y = track.id*track.height;
    let width = this.time_signature.numerator*this.beat_length_px;

    // Draw an empty region 
    this.drawEmptyRegion(start_x, start_y, width, track.height, track.colour)
    
    // Return the drawing information
    return {start: start_x, end: start_x + width, y: start_y}
  }

  // Draw an empty region
  drawEmptyRegion(x, y, width, height, colour='red') {
    return this.draw_rectangle(x, y, width, height, 'black', colour, 1);
  }

  // Select this region
  selectRegion(track, event) {

    // Make sure all regions are unselected
    this.unSelectAllRegions();

    // Get the region at this point
    let mouse_position = this.mouse_position(event);
    const region = track.getRegionAt(mouse_position.x);

    // Make sure we have a region
    if(!region) {
      return this.unSelectAllRegions();
    }

    let start_y = track.id*track.height;
    let width = region.drawing_data.end - region.drawing_data.start;

    // Draw a rectangle around the selected region
    this.draw_rectangle(region.drawing_data.start, start_y, width, track.height, 'black', 'transparent', 10)

    // Return the region
    return region;
  }

  // Change the size of a region
  editRegionLength(track, e) {

    // Make sure we are near an end off a region
    let on_edge = this.detectEdge(track, e)

    // Set to dragging
    if (!TrackDrawer.dragging && (on_edge.near_start || on_edge.near_end)) {
      this.startDragging();
      track.selected_region = on_edge.region;
      TrackDrawer.dragging_mode = this.dragging_modes.resize;
    }

    // Get the moving edge
    let edge = null;
    if(on_edge.near_start) {
      edge = 'start';
    } else if(on_edge.near_end) {
      edge = 'end';
    }

    // Get the mouse position
    let mouse = this.mouse_position(e)

    if(!track.selected_region) {
      return;
    }

    // Change the position
    track.selected_region.drawing_data[edge] = mouse.x

    // Update the region    
    this.redrawAllRegions(); 
  }

  // Move a region
  moveRegion(track, e) {

    // Get the current track
    const mouse = this.mouse_position(e);
    const region = track.getRegionAt(mouse.x);

    // Check we have a region
    if(!region) {
      return;
    }

    // Set the selected region
    track.selected_region = region;

    // Set dragging
    if(!TrackDrawer.dragging && region) {
      this.startDragging();
      TrackDrawer.dragging_mode = this.dragging_modes.move;
    }

    // Calculate the delta
    let delta = 0;
    if(TrackDrawer.previous_mouse_position) {
      delta = mouse.x - TrackDrawer.previous_mouse_position;
    }

    // Set the previous mouse position
    TrackDrawer.previous_mouse_position = mouse.x;

    // Update the track position
    track.selected_region.drawing_data.start += delta;
    track.selected_region.drawing_data.end += delta;

    // Redraw the regions
    this.redrawAllRegions(); 
  }

  // Un select all regions
  unSelectAllRegions() {
    return this.redrawAllRegions();
  }

  // Redraw the regions
  redrawAllRegions() {

    // Clear the canvas
    this.clear();
    
    // Go through the tracks
    const tracks = this.project.tracks().tracks;
    for(let track of tracks) {
      this.drawTrackRegions(track)
    }
  }
  
  // Draw a set of regions
  drawTrackRegions(track) {
    
    // Go throught the regions
    for (let region of track.regions) {
      
      // Draw the empty region
      let y = track.id*track.height;
      let width = region.drawing_data.end - region.drawing_data.start;
      this.drawEmptyRegion(region.drawing_data.start, y, width, track.height, track.colour)
    }
  }

  //==== Proximity functions
  
  // Get the beat closest to this position 
  nearestBeat(position) {
    return Math.round(position.x / this.beat_length_px);
  }

  // Detect if the mouse is near the edge of a region
  detectEdge(track, e) {

    // Get the mouse position
    let mouse_position = this.mouse_position(e);
    
    // Get the current track
    if (!track) {
      return;
    }
    
    // Go through the regions on this track
    for (let region of track.regions) {
      
      // Get the drawing data
      const drawing_data = region.drawing_data;

      // Make sure the mouse is inside the track height
      let y_start = track.id*track.height;
      let y_end = y_start + track.height;
      
      // The areas
      let in_y_range = mouse_position.y < y_end && mouse_position.y > y_start
      let near_start = Math.abs(drawing_data.start - mouse_position.x) < this.edge_tolerance
      let near_end = Math.abs(drawing_data.end - mouse_position.x) < this.edge_tolerance
      
      // Check if the mouse is on either end of the track
      if (in_y_range && (near_start || near_end)) {
        this.canvas.style.cursor = 'ew-resize';
        return {region: region, near_start: near_start, near_end: near_end}
      } else {
        this.canvas.style.cursor = '';
      }
    }

    return false;
  }
  
  //==== static variables
  static dragging = false;
  static dragging_mode = null;
  static previous_mouse_position;
}

export default RegionDrawerBase;
