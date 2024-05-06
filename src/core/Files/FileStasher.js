// =======================================================
//
// This is the base class for file stashers
//
// =======================================================
const FileSystem = require("./FileSystem");
const PathSplitter = require("./PathSplitter.js");
// =======================================================


class FileStasher { 

  constructor(root, depth, file_extension) {
    this.root = root;
    this.depth = depth;
    this.file_extension = file_extension;
  }

  // Stash a file
  async stash_file(filename, path, data) {
    path = await FileSystem().make_dir(path);
    return FileSystem().write_file(path + filename, data);
  }

  get_path(id) {
    let path = PathSplitter.make_path(id, this.depth);
    return this.root + "/" + path + "/";
  }

  get_file_path(id) {
    let path = this.get_path(id);
    return path + id + '.' + this.file_extension;
  }

  async unstash_file(id) {
    const path = this.get_file_path(id);
    const data = await FileSystem().read_file(path);
    return data;
  }

  // Unstash a file syncronously
  unstash_file_sync(id) {
    const path = this.get_file_path(id);
    const data = FileSystem().read_file_sync(path);
    return data;
  }

}

module.exports = FileStasher;