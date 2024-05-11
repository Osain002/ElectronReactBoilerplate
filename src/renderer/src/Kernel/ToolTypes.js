
const ToolTypes = {

  // Define the tools
  mouse: 1, 
  draw: 2, 

  // Array of the tools
  toArray: function() {
    return [
      ToolTypes.mouse, 
      ToolTypes.draw
    ]
  }

}

export default ToolTypes;