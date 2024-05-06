
const GridDivisions = {

  // Define the types
  BEATS_BARS: 1,
  
  // To string method
  to_string: function(type) {
    switch(type) {
      case GridDivisions.BEATS_BARS: return 'Bars and Beats';
    }
  },

  // To array 
  to_array: function () {
    return [GridDivisions.BEATS_BARS]
  }
}

export default GridDivisions;