import React, { useState, useEffect, useRef } from "react";
import Canvas from "./canvas";
import Scene from "./scene";
import ProgressBar from "react-bootstrap/ProgressBar";
import XMLExport from "./XMLexport";

import {} from "react-icons/ai";
import { BsMenuButton } from "react-icons/bs";
import { BsShareFill } from "react-icons/bs";
import { BsFillPlayCircleFill, BsZoomIn } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";

import { MdOutlineSaveAlt } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import { BsFillStopCircleFill } from "react-icons/bs";
import { IoDuplicate } from "react-icons/io5";
import { BiHelpCircle, BiTimeFive } from "react-icons/bi";
import { GrResume } from "react-icons/gr";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./edit.css";
import { color, flexbox } from "@mui/system";
import DesignDrawer from "./DesignDrawer";
import json2xml from "../hooks/helperFunctions/Json2XML";

//import _uniqueId from "lodash/uniqueId";

function Editor(props) {
  const [URL, setURL] = useState();
  const canvas = new Canvas(); // create instance of functional component Canvas, who execute code in body
  const ref = canvas.getRef(); // code in body canvas function like constructor(called one time), so that we have only one ref to on editor
  const [scenes, setScenes] = useState([]);
  const [selectedScene, setSelectedScene] = useState("");
  const [lastScene, setLastScene] = useState(null);
  const stopScene = useRef(false);
  useEffect(() => {
    console.log("selected scene changed: ", selectedScene);
  }, [selectedScene]);

  const {
    value,
    length,
    selected,

    onDelete,
    saveCurrentScene,
    sendXML,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      JsonObj: "",
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
    console.log("json model", cpJsonObj);
    if (cpJsonObj) canvas.loadJson(cpJsonObj);
    setSelectedScene(scene);
  };

  async function playScene() {
    const cpScenes = [...scenes];
    const initialJsonObj = cpScenes[0].JsonObj;
    canvas.loadJson(initialJsonObj);
    for (let i = 0; i < cpScenes.length; i++) {
      await new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (i !== cpScenes.length - 1) {
            const cpJsonObj = cpScenes[i + 1].JsonObj;
            canvas.loadJson(cpJsonObj);
          }
          clearTimeout(timer);
          resolve(); //We don't nned this promise to return a value
        }, cpScenes[i].duration);
      });
    }
  }
  async function resumeScene() {
    stopScene.current = false;
    const cpScenes = [...scenes];
    const index = scenes.indexOf(lastScene);
    if (index === 0) {
      playScene();
      return;
    }
  }
  const handleXMLdownload = (scene) => {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const xmlRoot = "<root>";
    const xmlCloseRoot = "</root>";
    let cpScenes = [...scenes];
    const index = scenes.indexOf(scene);
    let cpJsonObj = cpScenes[index].JsonObj;
    if (cpJsonObj === null) return;
    let xml = json2xml(JSON.parse(cpJsonObj), "");
    xml = xmlHeader.concat(xmlRoot, xml).concat(xmlCloseRoot);
    window["save_file"](xml);
  };
  const handleXML = (xml) => {
    if (xml.length < 20 || xml === null) return;
    window["xmltojson"](xml);
    const jsonObj = localStorage.getItem("convertedXML");
    if (jsonObj === null) return;
    canvas.loadJson(jsonObj);
  };

  function setDuration(val) {
    const cpScene = scenes;
    const index = scenes.indexOf(selectedScene);
    cpScene[index] = { ...selectedScene };
    cpScene[index].duration = val * 1000;
    setScenes(cpScene);
  }
  const handleLabelInsert = (size) => {
    if (size === "Large") {
      canvas.addCustomLabel(70);
      return;
    } else if (size === "Medium") {
      canvas.addCustomLabel(40);
      return;
    } else canvas.addCustomLabel(25);
    return;
  };
  const handleBgColor = (colorObj) => {
    const c = colorObj.hex;
    canvas.setBgColor(c);
  };

  return (
    <div className="body">
      <header>
        <div className="head">
          <BsMenuButton className="element" />
          <p className="element"> MOOVLY</p>
          <MdHelpOutline className="help" />
        </div>

        <div className="head">
          <button
            className="butt"
            onClick={() => {
              saveCurrentScene = { saveCurrent };
            }}
          >
            <MdOutlineSaveAlt />
          </button>

          <BsFillPlayCircleFill
            onClick={playScene}
            className="btn btn-primary m-2"
            id="account"
          />

          <button
            className="butt"
            onClick={() => handleXMLdownload(selectedScene)}
          >
            Export
          </button>
        </div>
      </header>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "aliceblue",
        }}
      >
        <DesignDrawer
          sendURL={(url) => {
            setURL(url);
          }}
          sendUploadImgURL={(url) => {
            setURL(url);
          }}
          insertLabel={handleLabelInsert}
          sendBgColor={handleBgColor}
        />

        <div className="colon">
          <div className="drop">
            <div
              ref={ref}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(e);
              }}
              style={{
                backgroundColor: "blue",

                width: "800px",
                height: "60vh",
                marginLeft: "35%",

                marginbottom: "30%",
              }}
            ></div>

            <div>
              <div>
                <button className="time">
                  <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    className="temp"
                  >
                    <BiTimeFive />
                  </Button>
                </button>
              </div>
              <button
                onClick={() => (stopScene.current = !stopScene.current)}
                className="btn btn-danger m-2"
              >
                <BsFillStopCircleFill />
              </button>

              <button onClick={resumeScene} className="btn btn-warning m-2">
                <GrResume />
              </button>
            </div>
          </div>

          <main>
            <div className="play">
              <ProgressBar animated now={88} />
              <button
                onClick={playScene}
                className="btn btn-primary m-2"
                id="btn"
              >
                <BsPlayFill id="bsplay" />
              </button>

              <div className="scene">
                <div className="xml">
                  <button
                    onClick={addScene}
                    className="btn btn-primary m-2"
                    id="add"
                  >
                    Add
                  </button>

                  {scenes.map((scene) => (
                    <Scene
                      key={Math.floor(Math.random() * 1000)}
                      addText="scene #{f}id"
                      onDelete={removeScene}
                      sendXML={handleXML}
                      value={scene}
                      selected={selectedScene === scene}
                      length={scenes.length}
                      switchScene={switchScene}
                      saveCurrentScene={saveCurrent}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="end">
              <BsZoomIn className="zoom" />
              <input type="range" />
              <IoDuplicate className="zoom" />

              <BiHelpCircle id="help" />
            </div>
          </main>

          <Dialog open={open} onClose={handleClose} hideBackdrop={true}>
            <DialogTitle>timer</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <input
                  type="integer"
                  onChange={(val) => {
                    setDuration(parseInt(val.nativeEvent.data));
                  }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Set</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Editor;
