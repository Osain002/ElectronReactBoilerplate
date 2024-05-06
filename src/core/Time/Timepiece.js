// =============================================================
//
// This class generates dates and times
//
// =============================================================
const RealTime = require("./RealTime");
// =============================================================

class Timepiece {

  // Get the datetime
  static datetime(){
    
    if(!process.env.USE_REAL_TIME){
      process.env.TIME = RealTime.datetime();
    }

    return process.env.TIME;
  }
}


module.exports = Timepiece