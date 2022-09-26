import React from "react";

import { SketchPicker, ChromePicker, BlockPicker } from "react-color";

import { useState } from "react";

function EmptyDrawer({ bgColorChange }) {
  //creating state to store our color and also set color using onChange event for sketch picker
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  // destructuring rgba from state
  const { r, g, b, a } = sketchPickerColor;

  //creating state to store our color and also set color using onChange event for block picker
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");

  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      {/* Sketch Picker from react-color and handling color on onChange event */}

      <ChromePicker onChangeComplete={bgColorChange} />
    </div>
  );
}

export default EmptyDrawer;
