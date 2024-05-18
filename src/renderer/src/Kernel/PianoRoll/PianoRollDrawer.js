import CanvasManager from "../../Core/Canvas/CanvasManager";
import CanvasController from "../../Core/Canvas/canvas_controller";

class PianoRollDrawer extends CanvasController {

  constructor(region) {
    super(CanvasManager.getCanvas('pianoRoll'));
    this.region = region;
  }

  
}

export default PianoRollDrawer;