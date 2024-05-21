class ArrayTools {
  // Counts number of occurrences of a given element
  static countOccurrences(array, element) {
    return array.reduce((acc, curr) => {
      if (curr.toString() === element.toString()) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  }

  // Get the indexes of all occurrences of a given element
  static indexesOf(array, element) {
    let indexes = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].toString() === element.toString()) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  // Find the index of an object
  static indexOfObject(array, object) {
    let index = 0;
    for (let obj of array) {
      if (JSON.stringify(obj) === JSON.stringify(object)) {
        return index;
      }
      index += 1;
    }
    return index;
  }

  // Deletes all occurrences of a given element
  static deleteOccurrences(array, element) {
    let indexes = this.indexesOf(array, element);
    let removed = 0;
    for (let i = 0; i < indexes.length; i++) {
      array.splice(indexes[i] - removed, 1);
      removed += 1;
    }
    return array;
  }

  // Delete objects containing these key/value pairs
  static deleteWhere(array, keyValPairs) {
    let result = [];
    for (let obj of array) {
      let match = true;
      for (let key of Object.keys(keyValPairs)) {
        if (obj[key] !== keyValPairs[key]) {
          match = false;
          break;
        }
      }
      if (!match) {
        result.push(obj);
      }
    }
    return result;
  }

  static deleteIndex(array, index) {
    return array.splice(index, 1);
  }

  // Extract value from array objects by key
  static extractKey(array, key) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === undefined) {
        throw new Error("Key does not exist");
      }
      result.push(array[i][key]);
    }
    return result;
  }

  // Get multiple array elements by index
  static getMultipleById(array, indexes) {
    let result = [];
    for (let i = 0; i < indexes.length; i++) {
      result[i] = array[indexes[i]];
    }
    return result;
  }

  // Get multiple objects from array by key
  static getKeys(array, key, keys) {
    return array.filter(obj => keys.includes(obj[key]));
  }

  // Converts an array of objects into an object of objects with an index
  static toIndexedObject(array, index) {
    const object = {};
    for (let obj of array) {
      if (object[obj[index]]) {
        object[obj[index]].push(obj);
      } else {
        object[obj[index]] = [obj];
      }
    }
    return object;
  }

  // Convert to a string, preserving types
  static toPreservedString(array) {
    let result = "";
    for (let i = 0; i < array.length; i++) {
      if (!isNaN(Number(array[i]))) {
        result += Number(array[i]);
      } else {
        result += `'${array[i]}'`;
      }

      if (i < array.length - 1) {
        result += ",";
      }
    }
    return result;
  }

  // Convert an object to an array
  static objectToArray(object) {
    let array = [];
    for (let key of Object.keys(object)) {
      array.push(object[key]);
    }
    return array;
  }

  // Push an element to an array if it doesn't already exist
  static uniquePush(array, element) {
    if (!array.includes(element)) {
      array.push(element);
    }
    return array;
  }

  // Merge two arrays so each element is unique
  static mergeUnique(array1, array2) {
    let result = [...array1];
    for (let element of array2) {
      if (!result.includes(element)) {
        result.push(element);
      }
    }
    return result;
  }
}

export default ArrayTools;
