// ================================================================
//
//  This file handles the filesystems. 
//  TODO: implement aws S3 functionality
//
// ================================================================

const LocalFileSystem = require("./LocalFileSystem");

function FileSystem() {
  return new LocalFileSystem();
};

module.exports = FileSystem;