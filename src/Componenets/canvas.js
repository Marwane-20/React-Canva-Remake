import usePikaso from "pikaso-react-hook";
import { useEffect } from "react";

export default function Canvas() {
  [this.ref, this.editor] = usePikaso();
  this.jsonTxt = this.editor?.export.toJson();
  this.image = null;
  useEffect(() => {
    if (!this.editor) return;
    this.editor?.shapes.label.insert({
      container: {
        x: 100,
        y: 100,
      },
      tag: {
        fill: "white",
      },
      text: {
        text: "NEW SCENE",
        fill: "balck",
        fontSize: 30,
      },
    });
  }, [this.editor]);
  this.attrImg = {
    x: 0,
    y: 0,
    URL: "",
  };
  this.attrTxt = {
    x: 0,
    y: 0,
    textColor: "black",
    bgColor: "white",
  };
  this.getRef = () => {
    return this.ref;
  };
  this.setBgImg = () => {
    this.editor.loadFromUrl(
      "https://dummyimage.com/783x431/db1bdb/fff.jpg&text=worked"
    );
    //this.editor.board.background.fill('#262626');
  };

  this.setImgAtt = (URL, x, y) => {
    const attr = { ...this.attrImg };
    attr.URL = URL;
    attr.x = x;
    attr.y = y;
    this.attrImg = { ...attr };
  };
  this.setTxtAtt = (x, y, textColor, bgColor) => {
    const attr = { ...this.attrTxt };
    attr.textColor = textColor;
    attr.bgColor = bgColor;
    attr.x = x;
    attr.y = y;
    this.attrTxt = { ...attr };
  };
  this.addImage = () => {
    const { x, y, URL } = this.attrImg;
    this.editor.shapes.image.insert(URL, {
      x: x,
      y: y,
      radius: 100,
    });
  };
  this.addText = () => {
    const { x, y, textColor, bgColor } = this.attrTxt;
    this.editor.shapes.label.insert({
      container: {
        x: x,
        y: y,
      },      
      text: {
        text: "TEXT",
        fill: textColor,
        fontSize: 40,
      },
    });
  };
  
  this.addCustomLabel = (textSize) => {
    this.editor.shapes.label.insert({
      container: {
        x: 15,
        y: 15,
      },
      tag: {
        fill: "white",
      },
      text: {
        text: "TEXT",
        fill: "black",
        fontSize: textSize,
      },
    });
  };
  this.setJsonObj = () => {
    this.jsonTxt = this.editor.export.toJson();
    this.jsonTxt = JSON.stringify(this.jsonTxt); //convertit une valeur JavaScript en chaîne JSON
    return this.jsonTxt;
  };
  this.getJsonObj = () => {
    return this.jsonTxt;
  };
  this.loadJson = (jsonTxt) => {
    //JSON.parse(jsonTxt);
    //setTimeout(() => {
    this.editor.load(jsonTxt); //charger l'objet json dans l'editeur
    //}, 1000);
  };
  this.resetEditor = () => {
    this.editor.reset();
  };
  this.exportImg = () => {
    this.image = this.editor?.export.toImage({
      pixelRatio: 3,
    });
    return this.image;
  };
  this.setBgColor = color => {
    const c = color;
    this.editor.board.background.fill(`${c}`);
  }
  

  }