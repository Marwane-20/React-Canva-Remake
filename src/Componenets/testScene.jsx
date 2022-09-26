import React, { useEffect, useRef, useState } from "react";
import _uniqueId from "lodash/uniqueId";
import usePrev from "./usePrev";

function Scene(props) {
  const { value, length, selected, switchScene, onDelete, saveCurrentScene } =
    props;
  return (
    <div>
      <button
        onClick={() => {
          switchScene(value);
        }}
      >
        Scene
      </button>
      {length > 1 && (
        <button onClick={() => onDelete(value)} className="btn btn-danger m-2">
          remove scene
        </button>
      )}
      {selected && (
        <button
          onClick={() => {
            saveCurrentScene(value);
          }}
          className="btn btn-success m-2"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default Scene;
