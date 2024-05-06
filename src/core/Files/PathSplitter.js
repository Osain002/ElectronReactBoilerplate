// =========================================================
//
// This class makes paths with depth
//
// =========================================================
const fileDepths = require("./FileDepths");
// =========================================================


class PathSplitter {

  static make_path(id, depth) {

    if(depth == fileDepths.THOUSANDS) {
      return this.thousands(id);  
    } else if(depth == fileDepths.MILLIONS) {
      return this.millions(id);
    } else if(depth == fileDepths.BILLIONS) {
      return this.billions(id);
    }
  }

  static thousands(id) {
    const thousands = Math.floor(id/1000);
    const number = id - thousands;
    return `${thousands}/${number}`;
  } 

  static millions(id) {
    const thousands = Math.floor(id/1000);
    let number = id - thousands;
    const millions = Math.floor(id/1000000);
    number = id - millions;
    return `${millions}/${thousands}/${number}`;
  }

  static billions(id) {
    const thousands = Math.floor(id/1000);
    let number = id - thousands;
    const millions = Math.floor(id/1000000);
    number = id - millions;
    const billions = Math.floor(id/1000000000);
    number = id - billions;
    return `${billions}/${millions}/${thousands}/${number}`;
  }
}

module.exports = PathSplitter;