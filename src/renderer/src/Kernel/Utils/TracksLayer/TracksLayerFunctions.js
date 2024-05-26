import CanvasManager from "../../Canvas/CanvasManager";
import canvasTypes from "../../Canvas/CanvasTypes";
import Regions from "../../Regions/Regions";
import ToolTypes from "../../ToolTypes";
import { EditorTypes } from "../EditorTypes";
import TrackCanvasConverter from "../TrackCanvasConverter";

// Handle canvas double click
export function canvasDoubleClick(tracks, tool, event) {
  let response = null;
  let canvas = CanvasManager.getCanvas(canvasTypes.track);
  canvas.eventHandler.mouseEvent(event, function (x_position, track) {

    // Add a new region
    if (tool == ToolTypes.draw) {
      tracks.regions().addRegion(track, x_position);
    }
    
    // Open an editor
    if (tool == ToolTypes.mouse) {
      let position = TrackCanvasConverter.timeToPx(x_position)
      let region = tracks.regions().getRegionAtPosition(track, position);
      response = {track: track, region: region, editor: EditorTypes.pianoRoll};
    }

    // Redraw the regions
    canvas.drawer.drawRegions();
  }, true);

  return response;

}

// Handle canvas click
export function canvasClick(tracks, tool, event) {
  let canvas = CanvasManager.getCanvas(canvasTypes.track);
  canvas.eventHandler.mouseEvent(event, function (x_position, track) {
    if (tool == ToolTypes.mouse) {
      tracks.regions().selectRegion(track, x_position);
    }

    // Redraw the regions
    canvas.drawer.drawRegions();

  })
}

// Handle the canvas hover
export function canvasMouseMove(tracks, tool, event) {
  let canvas = CanvasManager.getCanvas(canvasTypes.track);

  // If we are dragging, use this event handler
  if (canvas.eventHandler._is_dragging) {
    return canvas.eventHandler.mouseEvent(event, function (x_position, track) {

      // Check if we are near any regions
      let tolerance = TrackCanvasConverter.timeToPx(1)
      let closest_region = tracks.regions().getNearestRegion(track, x_position, tolerance);
      if (!closest_region) {
        return;
      }

      // Check the proximity type
      let type = closest_region.proximity_type;
      // Move a region
      if (type == Regions.proximity_types.interior) {
        tracks.regions().moveRegion(closest_region.region, x_position, true);
      }

      // Resize a region
      if (type == Regions.proximity_types.left_edge
        || type == Regions.proximity_types.right_edge) {
        tracks.regions().resizeRegion(closest_region.region, type, x_position, true);
      }

      // Re draw the regions
      canvas.drawer.drawRegions();
    })
  }

  // If we are not dragging use this event handler
  return canvas.eventHandler.mouseEvent(event, function (x_position, track) {

    // Check if we are near any regions
    let tolerance = TrackCanvasConverter.timeToPx(1)
    let closest_region = tracks.regions().getNearestRegion(track, x_position, tolerance);

    // If we are in normal mode
    if (closest_region && tool == ToolTypes.mouse) {
      return canvas.eventHandler.setProximityCursor(closest_region.proximity_type);
    } else {
      return canvas.eventHandler.setProximityCursor();
    }

  })
}

// Handle mouse down
export function canvasMouseDown(tracks, tool, event) {
  let handler = CanvasManager.getEventHandler(canvasTypes.track);
  handler.mouseEvent(event, function (x_position, track) {
    handler.startDragging();
  })
}

// Handle the mouse up event (cleanup)
export function canvasMouseUp(tracks, tool, event) {
  let handler = CanvasManager.getEventHandler(canvasTypes.track);
  handler.mouseEvent(event, function (x_position, track) {
    handler.stopDragging();
    tracks.regions().clearTempDrawingData();
  })
}