//=================================================
//
// This class is used to get various cursor types
//
//=================================================
//=================================================

class Cursors {

  // Define the types
  static DEFAULT = 0;
  static POINTER = 1;
  static RESIZE_HORIZONTAL = 2;
  static RESIZE_VERTICAL = 3;
  static TEXT = 4;
  static WAIT = 5;
  static CROSSHAIR = 6;
  static MOVE = 7;
  static NOT_ALLOWED = 8;
  static HELP = 9;
  static PROGRESS = 10;
  static RESIZE_DIAGONAL_NE_SW = 11;
  static RESIZE_DIAGONAL_NW_SE = 12;
  static RESIZE_COLUMN = 13;
  static RESIZE_ROW = 14;
  
  // Get the cursor css property
  static getCursor(type) {
    switch(type) {
      case Cursors.DEFAULT: return 'default';
      case Cursors.POINTER: return 'pointer';
      case Cursors.RESIZE_HORIZONTAL: return 'ew-resize';
      case Cursors.RESIZE_VERTICAL: return 'ns-resize';
      case Cursors.TEXT: return 'text';
      case Cursors.WAIT: return 'wait';
      case Cursors.CROSSHAIR: return 'crosshair';
      case Cursors.MOVE: return 'move';
      case Cursors.NOT_ALLOWED: return 'not-allowed';
      case Cursors.HELP: return 'help';
      case Cursors.PROGRESS: return 'progress';
      case Cursors.RESIZE_DIAGONAL_NE_SW: return 'nesw-resize';
      case Cursors.RESIZE_DIAGONAL_NW_SE: return 'nwse-resize';
      case Cursors.RESIZE_COLUMN: return 'col-resize';
      case Cursors.RESIZE_ROW: return 'row-resize';
      default: return 'default';
    }
  }

}

export default Cursors;
