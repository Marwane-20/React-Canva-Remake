import React from 'react';
import exportFromJSON from "export-from-json";

export default function XMLExport(props) {

  function onClick() {
    const data = props.data;
    const fileName = props.fileName ? props.fileName : "exported";
    let fields = props.fields ? props.fields : [];  //empty list means "use all"
    const exportType = 'xml';
    exportFromJSON({data, fileName, fields, exportType})
  }

  return (
    <button onClick={onClick}>
      download
    </button>
  )

}



