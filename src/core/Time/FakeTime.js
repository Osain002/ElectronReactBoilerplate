
// =============================================================
//
// This class is used to fake the time
//
// =============================================================

const RealTime = require("./RealTime");

// =============================================================


class FakeTime {

  // Set the fake time
  constructor(datetime){
    process.env.TIME = datetime;
    process.env.USE_REAL_TIME = false;
  }

  // Put the real time back
  destroy(){
    process.env.USE_REAL_TIME = true;
    process.env.TIME = RealTime.datetime();
  }

  // Set a new time
  set(datetime){
    process.env.USE_REAL_TIME = false;
    process.env.TIME = datetime
  }
}

module.exports = FakeTime;