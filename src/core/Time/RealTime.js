
// =============================================================
//
// This class generates dates and times
//
// =============================================================
// =============================================================


class RealTime{

  // Get the date and time right now
  static datetime(){
    const datetime = new Date().toJSON();
    return datetime.replace("Z", "")
  }
  
}

module.exports = RealTime;