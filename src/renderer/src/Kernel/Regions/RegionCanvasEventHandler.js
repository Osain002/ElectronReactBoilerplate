import ToolTypes from "../ToolTypes";
import { EditorTypes } from "../Utils/EditorTypes";
import KeyTypes from "../Utils/KeyTypes";
import TrackCanvasConverter from "../Utils/TrackCanvasConverter";
import Regions from "./Base/Regions";

class RegionCanvasEventHandler {

  constructor(tracks, canvas, allow_editor_overlays=false) {
    this.adapter = canvas.eventAdapter;
    this.drawer = canvas.drawer;
    this.tracks = tracks;
    this.allow_editor_overlays = allow_editor_overlays;
  }
  
  // Handle canvas double click
  canvasDoubleClick(tool, event) {
    return this.adapter.mouseEvent(event, this.tracks, (x_position, track) => {
  
      // Add a new region
      if (tool == ToolTypes.draw) {
        this.tracks.regions().addRegion(track, x_position);
      }
      
      // Open an editor
      if (tool == ToolTypes.mouse && this.allow_editor_overlays) {
        let position = TrackCanvasConverter.timeToPx(x_position)
        let region = this.tracks.regions().getRegionAtPosition(track, position);
        return {track: track, region: region, editor: EditorTypes.pianoRoll};
      }
  
      // Redraw the regions
      this.drawer.drawRegions(this.tracks);
    }, true);
  
  }
  
  // Handle canvas click
  canvasClick(tool, event) {
    this.adapter.mouseEvent(event, this.tracks, (x_position, track) => {
      if (tool == ToolTypes.mouse) {
        this.tracks.regions().selectRegion(track, x_position);
      }
  
      // Redraw the regions
      this.drawer.drawRegions(this.tracks);
  
    })
  }
  
  // Handle the canvas hover
  canvasMouseMove(tool, event) {
  
    // If we are dragging, use this event handler
    if (this.adapter._is_dragging) {
      return this.adapter.mouseEvent(event, this.tracks, (x_position, track) => {
        // Check if we are near any regions
        let tolerance = TrackCanvasConverter.timeToPx(1)
        let editing_region = this.tracks.regions().getEditingRegion();
        let closest_region = this.tracks.regions().getNearestRegion(track, x_position, tolerance);
        
        if (closest_region && !editing_region) {
          this.tracks.regions().setEditingRegion(closest_region.region);
          editing_region = closest_region.region;
        }
  
        // Check the proximity type
        let type = null 
        if (closest_region){
          type = closest_region.proximity_type;
        }
  
        // Resize a region
        if (type == Regions.proximity_types.left_edge
          || type == Regions.proximity_types.right_edge) {
          this.tracks.regions().resizeRegion(closest_region.region, type, x_position, true);
          this.drawer.drawRegions(this.tracks);
          return;
        }
  
        // Move a region
        if (type == Regions.proximity_types.interior || editing_region) {
          this.tracks.regions().moveRegion(track, editing_region, x_position, true);
          this.drawer.drawRegions(this.tracks);
          return;
        }
  
      })
    }

    // If we are not dragging use this event handler
    return this.adapter.mouseEvent(event, this.tracks, (x_position, track) => {
  
      // Check if we are near any regions
      let tolerance = TrackCanvasConverter.timeToPx(1)
      let closest_region = this.tracks.regions().getNearestRegion(track, x_position, tolerance);
  
      // If we are in normal mode
      if (closest_region && tool == ToolTypes.mouse) {
        return this.adapter.setProximityCursor(closest_region.proximity_type);
      } else {
        return this.adapter.setProximityCursor();
      }
  
    })
  }
  
  // Handle mouse down
  canvasMouseDown(tool, event) {
    this.adapter.mouseEvent(event, this.tracks, (x_position, track) => {
      this.adapter.startDragging();
    })
  }
  
  // Handle the mouse up event (cleanup)
  canvasMouseUp(tool, event) {
    this.adapter.mouseEvent(event, this.tracks, (x_position, track) => {
      this.adapter.stopDragging();
      this.tracks.regions().setEditingRegion(null);
      this.tracks.regions().clearTempDrawingData();
    })
  }
  
  
  canvasKeyPress(tool, event) {
  
    // Get the action for this key press
    let action = KeyTypes.getAction(event);
    if(action == KeyTypes._action_delete) {
      this.tracks.regions().deleteSelectedRegion();
      this.drawer.drawRegions(this.tracks);
    }
    
  }

}

export default RegionCanvasEventHandler;