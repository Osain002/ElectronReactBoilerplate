// =======================================================
//
//  This is the base class for file stashers
//
// =======================================================
const fs = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path'); 
// =======================================================


class LocalFileSystem {

  constructor(){}
  
  // Write a file
  async write_file(path, data) {
    const saved = await fs.writeFile(path, data)
    return saved;
  } 
  
  // Make directory
  async make_dir(path) {
    if(!existsSync(path)) {
      await fs.mkdir(path, {recursive: true})
    }
    return path;
  }
  
  // Read a file
  async read_file(path) {
    try{
      const data = await fs.readFile(path);
      return data.toString();
    } catch(error) {
      if(error.code === 'ENOENT') {
        return null;
      }
    }
  }
  
  // Check file exists
  async file_exists(path) {
    let exists = await this.read_file(path);
    if(exists) {
      return true;
    } else {
      return false;
    }
  }

  // Read file syncronously
  async read_file_sync(path) {
    let data = await new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
          if(err) {
            console.log('error:', err);
            reject(err);
          } else {
            console.log('inner:',  data.toString())
            resolve(data.toString());
          }
        })
    })
    return data;
  }
}

module.exports = LocalFileSystem;