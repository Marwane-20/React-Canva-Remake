import { useState, useEffect } from "react";
import Canvas from "./main";
import Scene from "./testScene";
import ProgressBar from "react-bootstrap/ProgressBar";
import XMLExport from "./XMLexport";
//import _uniqueId from "lodash/uniqueId";

function Editor() {
  const [URL, setURL] = useState();
  const canvas = new Canvas(); // create instance of functional component Canvas, who execute code in body
  const ref = canvas.getRef(); // code in body canvas function like constructor(called one time), so that we have only one ref to on editor
  const [scenes, setScenes] = useState([]);
  const [selectedScene, setSelectedScene] = useState("");
  useEffect(() => {
    console.log("selected scene changed: ", selectedScene);
  }, [selectedScene]);

  const handleDrop = (e) => {
    e.preventDefault();
    canvas.setImgAtt(URL, 10, 10);
    canvas.addImage();
  };
  const handleClick = () => {
    canvas.setTxtAtt(30, 30, "black", "yellow");
    canvas.addText();
    canvas.setBgImg();
  };
  const addScene = () => {
    const scene = {
      Id: Math.floor(Math.random() * 10000),
      JsonObj: null,
      duration: 1000,
    };
    const cpScenes = [...scenes];
    cpScenes.push(scene);
    setScenes(cpScenes);
  };
  const removeScene = (scene) => {
    const cpScenes = scenes.filter((sc) => sc !== scene);
    setScenes(cpScenes);
  };
  //---------------------------------
  const saveCurrent = (scene) => {
    const cpScene = scenes;
    const index = scenes.indexOf(scene);
    cpScene[index] = { ...scene };
    const jsonObject = canvas.setJsonObj();
    cpScene[index].JsonObj = jsonObject;
    setScenes(cpScene);
    //console.log("this object was saved", cpScene[index].JsonObj);
  };
  const switchScene = (scene) => {
    let cpScenes = [...scenes];
    const index = scenes.indexOf(scene);
    const cpJsonObj = cpScenes[index].JsonObj;
    //console.log("this object in switchScene", cpJsonObj);
    canvas.resetEditor();
    if (cpJsonObj) canvas.loadJson(cpJsonObj);
    setSelectedScene(scene);
  };
  async function playScene() {
    const cpScenes = [...scenes];
    canvas.resetEditor();
    const initialJsonObj = cpScenes[0].JsonObj;
    canvas.loadJson(initialJsonObj);
    for (let i = 0; i < cpScenes.length; i++) {
      await new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (i !== cpScenes.length - 1) {
            canvas.resetEditor();
            const cpJsonObj = cpScenes[i + 1].JsonObj;
            canvas.loadJson(cpJsonObj);
          }
          clearTimeout(timer);
          resolve(); //We don't nned this promise to return a value
        }, cpScenes[i].duration);
      });
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "50%",
          height: "50vh",
        }}
      >
        <img
          alt="dummy-img"
          src="https://dummyimage.com/200x100/c916c9/fff.jpg"
          draggable="true"
          onDragStart={(e) => {
            setURL(e.target.src);
            //console.log(URL);
          }}
        />
        <img
          alt="dummy-img2"
          src="https://dummyimage.com/300x100/000/fff.jpg"
          draggable="true"
          onDragStart={(e) => {
            setURL(e.dataTransfer.getData("URL"));
            //console.log(URL);
          }}
        />
        <button onClick={handleClick}>Add text</button>
        <input readOnly type="text" value="yellow" />
        <div>
          {scenes.map((scene) => (
            <Scene
              key={Math.floor(Math.random() * 1000)}
              addText="scene #{f}id"
              onDelete={removeScene}
              value={scene}
              selected={selectedScene === scene}
              length={scenes.length}
              switchScene={switchScene}
              saveCurrentScene={saveCurrent}
            />
          ))}
          <button onClick={addScene} className="btn btn-primary m-2">
            Add scene
          </button>
        </div>
      </div>
      <div
        style={{
          background: "#ccc",
          width: "70%",
          height: "70vh",
        }}
      >
        <div
          ref={ref}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(e);
          }}
          style={{
            background: "#ccc",
            width: "100%",
            height: "70vh",
          }}
        ></div>
        <ProgressBar animated now={88} />
        <button onClick={playScene} className="btn btn-primary m-2">
          Play scene
        </button>
      </div>
    </div>
  );
}

export default Editor;
