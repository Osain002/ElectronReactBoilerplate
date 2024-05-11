import CanvasController from "../../../Core/Canvas/canvas_controller";
import Project from "../../Project/Project";
import ToolTypes from "../../ToolTypes";
import trackTypes from "../TrackTypes";

class TrackDrawer extends CanvasController {

  constructor(canvas) {

    // Check if there is already an instance
    if (TrackDrawer.instance) {
      return TrackDrawer.instance;
    }

    // Initialise the parent class
    super(canvas);

    // Setup
    this.project = new Project();
    this.current_mode = ToolTypes.mouse;
    this.beat_length_px = 20;
    this.track_height = 80;

    // Edge tolerance
    this.edge_tolerance = 10;

    // TODO link this to the form
    this.time_signature = {numerator: 4, denominator: 4};

    this.dragging_modes = {
      resize: 1, 
      move: 2, 
    }

    // Set the instance
    TrackDrawer.instance = this;

  }

  //==== Setup

  // Set the mode
  setMode(mode) {
    this.current_mode = mode;
  }


  //==== Click handlers

  // Handle a double click on the canvas
  handleDoubleClick(e) {
    if (this.current_mode == ToolTypes.mouse) {
    } else if (this.current_mode == ToolTypes.draw) {
      return this.drawNewInstrumentRegion(e);
    } else {
      return;
    }
  }

  // Handle a single click
  handleClick(e) {
    if (this.current_mode == ToolTypes.mouse) {
      return this.selectRegion(e);
    } 
  }

  // Handle mousedown events
  handleMouseDown(e) {

    // Mouse mode
    if (this.current_mode == ToolTypes.mouse) {

      if (this.detectEdge(e)) {
        return this.editRegionLength(e);
      } else {
        console.log('moving')
        return this.moveRegion(e);
      }

    }
  }

  // Handle hover
  handleMouseMove(e) {

    // If we are dragging
    if(this.is_dragging) {
      return this.handleDrag(e)
    }

    // Handle modes
    if (this.current_mode == ToolTypes.mouse) {
      return this.detectEdge(e);
    }
  }

  // Handle dragging
  handleDrag(e) {
    if (this.dragging_mode == this.dragging_modes.resize) {
      return this.editRegionLength(e);
    } else if (this.dragging_mode == this.dragging_modes.move) {

    }
  }

  // Handle mouse up
  handleMouseUp(e) {
    const current_track = this.project.tracks().getSelectedTrack();
    current_track.updateCurrentRegion();
    this.is_dragging = false;
  }
  

  //==== Regions

  // Draw a new region
  drawNewInstrumentRegion(e) {
    
    // Get the current track
    const current_track = this.project.tracks().getSelectedTrack();

    // Ensure this is a virtual instrument track
    if(current_track.type != trackTypes.VIRTUAL_INST) {
      return alert("Cannot create region on non virtual instrument track");
    }

    // Get the click position
    let mouse_position = this.mouse_position(e);
    
    // Get the nearest beat to snap to
    let beat = this.nearestBeat(mouse_position);

    // Get the region position
    let start_x = beat*this.beat_length_px;
    let start_y = current_track.id*this.track_height;
    let width = this.time_signature.numerator*this.beat_length_px;

    // Draw an empty region 
    this.drawEmptyRegion(start_x, start_y, width, current_track.colour)

    // Add a region to the track object
    current_track.new_region(start_x, start_x + width);
  }

  // Draw an empty region
  drawEmptyRegion(x, y, width, colour='red') {
    return this.draw_rectangle(x, y, width, this.track_height, 'black', colour);
  }

  // Select this region
  selectRegion(e) {

    // Make sure all regions are unselected
    this.unSelectAllRegions();

    // Get the current track
    const current_track = this.project.tracks().getSelectedTrack();

    // Get the region at this point
    let mouse_position = this.mouse_position(e);
    const region = current_track.getRegionAt(mouse_position.x);

    // Make sure we have a region
    if(!region) {
      return this.unSelectAllRegions();
    }

    let start_y = current_track.id*this.track_height;
    let width = region.end - region.start;

    // Draw a rectangle around the selected region
    return this.draw_rectangle(region.start, start_y, width, this.track_height, 'black', 'transparent', 10)

  }

  // Change the size of a region
  editRegionLength(e) {

    // Make sure we are near an end off a region
    let on_edge = this.detectEdge(e)
    const current_track = this.project.tracks().getSelectedTrack();

    // Set to dragging
    if (!this.is_dragging && (on_edge.near_start || on_edge.near_end)) {
      current_track.setSelectedRegion(on_edge.region);
      this.is_dragging = true;
      this.dragging_mode = this.dragging_modes.resize;
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

    // Change the position
    current_track.selected_region[edge] = mouse.x

    // Update the region    
    this.redrawAllRegions(); 
    current_track.updateCurrentRegion();

  }

  // Move a region
  moveRegion(e) {

    // Get the current track
    const current_track = this.project.tracks().getSelectedTrack();
    const mouse = this.mouse_position(e);
    const region = this.project.tracks().getRegionAt(mouse.x);

    // Check we have a region
    if(!region) {
      return;
    }

    // Set dragging
    if(!this.is_dragging && region) {
      current_track.setSelectedRegion(region.id);
      this.is_dragging = true;
      this.dragging_mode = this.dragging_modes.move;
    }

    let delta_start = mouse.x - current_track.selected_region.start;
    let delta_end = mouse.x - current_track.selected_region.end;

    current_track.selected_region.start += delta_start;
    current_track.selected_region.end += delta_end;

    this.redrawAllRegions(); 
    current_track.updateCurrentRegion();
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
      let y = track.id*this.track_height;
      let width = region.end - region.start;
      
      this.drawEmptyRegion(region.start, y, width, track.colour)

      // Draw the content
    }
  }

  //==== Proximity functions
  
  // Get the beat closest to this position 
  nearestBeat(position) {
    return Math.round(position.x / this.beat_length_px);
  }

  // Detect if the mouse is near the edge of a region
  detectEdge(e) {
    // Get the mouse position
    let mouse_position = this.mouse_position(e);
    
    // Get the current track
    const current_track = this.project.tracks().getSelectedTrack();
    if (!current_track) {
      return;
    }
    
    // Go through the regions on this track
    for (let region of current_track.regions) {
      
      // Make sure the mouse is inside the track height
      let y_start = current_track.id*this.track_height;
      let y_end = y_start + this.track_height;
      
      // The areas
      let in_y_range = mouse_position.y < y_end && mouse_position.y > y_start
      let near_start = Math.abs(region.start - mouse_position.x) < this.edge_tolerance
      let near_end = Math.abs(region.end - mouse_position.x) < this.edge_tolerance
      
      // Check if the mouse is on either end of the track
      if (in_y_range && (near_start || near_end)) {
        this.canvas.style.cursor = 'ew-resize';
        return {region: region.id, near_start: near_start, near_end: near_end}
      } else {
        this.canvas.style.cursor = '';
      }
    }

    return false;
  }
  

}

export default TrackDrawer;
