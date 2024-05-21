
class ArrayModifier{

  // Split an array into chunks
  static split(array, number){

    const split_array = [];
    let chunk_length = Math.floor(array.length/number)
    let sub_array_count = 0;
    for(let i=0; i<array.length; i+=chunk_length){ 
      if(sub_array_count === number-1 && array.length%number !== 0){
        chunk_length += 1;
      }

      split_array.push(array.slice(i, i+chunk_length))
      sub_array_count += 1;
    }
    return split_array;
  }

  // Shift all elements of array along by 1 place
  static right_shift(array){
    let final = array.pop();
    array.unshift(final);
    return array;
  }

  // Shift all elements of array along by 1 place
  static left_shift(array){
    let first = array.shift()
    array.push(first)
    return array;
  }

  // Pairs elements of 2 arrays
  static pair_arrays(array_1, array_2){

    if(array_1.length !== array_2.length){
      throw new Error('Dimension error');
    }

    let result = [];
    for(let i=0; i<array_1.length; i++){
      result.push([array_1[i], array_2[i]]);
    }
    return result;
  }

  // Shift once and make pairing
  static shift_pair(array){
    let array_copy = array.map((x) => x);
    let shifted_array = this.left_shift(array_copy);
    return this.pair_arrays(array, shifted_array);

  }

  // Get all unique 2-tuples of array elements
  static unique_pairing(array){
    
    // Make a copy of the array
    let result = [];
    let array_copy = array.map((x) => x);
    for(let i=0; i<array.length-2; i++){
      array_copy = this.right_shift(array_copy);
      result = result.concat(this.pair_arrays(array, array_copy));
    }
    return result;
  }
}

module.exports = ArrayModifier