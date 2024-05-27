import ArrayExtractor from "../../../Core/Arrays/ArrayExtractor";
import ArrayTools from "../../../Core/Arrays/ArrayTools";
import TracksManager from "../../Tracks/TracksManager";
import CanvasDrawer from "../Base/CanvasDrawer";

class RegionDrawer extends CanvasDrawer {
  
  constructor(initialised_canvas) {
    super(initialised_canvas);

    // The region outlines
    this._outline_width = 1;
    this._outline_selected_width = 5;

  }

  // Draw the regions
  drawRegions(tracks) {

    tracks = tracks.getTracksObject();
    this.clear();
    
    // Get through the regions
    let regions = [];
    for(let track in tracks) {
      regions = regions.concat(tracks[track].regions);
    }

    // Draw all the regions
    for(let region of regions) {
      this.drawEmptyRegion(region.drawing_data, region.selected);
      this.drawContentsPreview(region);
    }    
  }

  // Draw an empty region
  drawEmptyRegion(drawing_data, selected) {

    // Check if this region is selected
    let line_width = this._outline_width;
    if(selected) {
      line_width = this._outline_selected_width;
    }

    return this.draw_rectangle(
      drawing_data.x, 
      drawing_data.y, 
      drawing_data.width, 
      drawing_data.height, 
      'black', 
      drawing_data.colour, 
      line_width
    );
  }

  drawContentsPreview(region) {
    this.drawPianoRollPreview(region);
  }

  drawPianoRollPreview(region) {
    // Check if the region has contents
    if (!region.contents) {
      return;
    }
  
    // Get the region drawing data
    const { drawing_data, width, division } = region;
    const { height, x: startX, y: startY } = drawing_data;
    const noteHeight = height / 88;
    const contents = ArrayTools.objectToArray(region.contents);
    const notes = ArrayExtractor.extractKey(contents, "regions");
    const divisionWidth = drawing_data.width / (width * division);
  
    // Iterate through the notes
    notes.forEach((keyNotes, i) => {
      // Calculate the y-coordinate for the current key
      const y = startY + i * noteHeight;
  
      // Draw each note
      keyNotes.forEach(note => {
        const { beat_start: beatStart, width: noteWidth } = note;
  
        // Calculate the x-coordinate and width for the current note
        const x = startX + beatStart * divisionWidth;
        const width = noteWidth * divisionWidth;
  
        // Ensure the note does not extend past the end of the region
        if (x + width <= startX + drawing_data.width) {
          // Draw the note
          this.draw_rectangle(x, y, width, 2, 'black', 'black', 1);
        }
      });
    });
  }
  
}

export default RegionDrawer;