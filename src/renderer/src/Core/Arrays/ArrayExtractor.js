class ArrayExtractor {

  // Strip this key into a new array
  static extractKey(array, key, merge_arrays=false) {
    let result = [];
    for (const element of array) {
      if(merge_arrays) {
        result = [...result, ...element[key]];
      } else {
        result.push(element[key]);
      }
    }
    return result;
  }

  // Strip this key from an array of arrays
  static extractKeyDepth2(array, key) {
    let result = [];
    for (const subArray of array) {
      result = result.concat(ArrayExtractor.extractKey(subArray, key));
    }
    return result;
  }

  // Strip this key into a new array, keeping only unique values
  static extractUniqueKey(array, key) {
    const result = [];
    for (const element of array) {
      const value = element[key];
      if (!result.includes(value)) {
        result.push(value);
      }
    }
    return result;
  }

  // Extract the full data for any non-matches of this key in our matches
  static extractFullNonMatches(array, key, matches) {
    const result = [];
    for (const element of array) {
      if (!matches.includes(element[key])) {
        result.push(element);
      }
    }
    return result;
  }

  // Extract the full data for any matches of this key in our matches
  static extractFullMatches(array, key, matches) {
    const result = [];
    for (const element of array) {
      if (matches.includes(element[key])) {
        result.push(element);
      }
    }
    return result;
  }

  // Extract the array if the value is greater than this
  static extractGreater(array, key, value) {
    const result = [];
    for (const element of array) {
      if (element[key] > value) {
        result.push(element);
      }
    }
    return result;
  }

  // Extract the array if the value is less than this
  static extractLess(array, key, value) {
    const result = [];
    for (const element of array) {
      if (element[key] < value) {
        result.push(element);
      }
    }
    return result;
  }

  // Find the first element with a match for this key
  static findMatch(array, key, match) {
    for (const element of array) {
      if (element[key] === match) {
        return element;
      }
    }
    return null;
  }

  // Extract specified columns from each element in the array
  static extractColumns(array, keys) {
    const result = [];
    for (const element of array) {
      const newElement = {};
      for (const key of keys) {
        newElement[key] = element[key];
      }
      result.push(newElement);
    }
    return result;
  }

  // Extract the names of keys from the array
  static extractKeyNames(array) {
    const result = [];
    for (const key in array) {
      result.push(key);
    }
    return result;
  }

  // Extract the values from the array
  static extractValues(array) {
    const result = [];
    for (const key in array) {
      result.push(array[key]);
    }
    return result;
  }

  // Extract the values from the array in the order specified
  static extractValuesInOrder(array, order) {
    const result = [];
    for (const key of order) {
      result.push(array[key]);
    }
    return result;
  }

  // Get the subset of an array with only specified indexes
  static keyedSubset(array, indexes) {
    const newArray = {};
    for (const index of indexes) {
      newArray[index] = array[index];
    }
    return newArray;
  }
}

export default ArrayExtractor;
