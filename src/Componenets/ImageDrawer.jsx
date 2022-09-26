import React, { useState } from "react";

import "./ImageDrawer.css";

import First from "./image/prof.gif";
import Second from "./image/prof2.png";
import Third from "./image/prof3.gif";
import Four from "./image/prof4.png";
import Five from "./image/prof5.webp";
import Six from "./image/3.gif";
import Seven from "./image/photofunky.gif";
import Height from "./image/Hi-Animation-without-background-.gif";

function ImageDrawer({ imageDragged }) {
  return (
    <div className="gif">
      <div>
        <img
          src={First}
          className="image"
          draggable="true"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>

        <img
          src={Third}
          className="image"
          draggable="true"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>
      </div>
      <div>
        <img
          src={Four}
          className="image"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>
        <img
          src={Second}
          className="image"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>
      </div>
      <div>
        <img
          src={Six}
          className="image"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>

        <img
          src={Five}
          className="image"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>
      </div>

      <div>
        <img
          src={Seven}
          className="image"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>
        <img
          src={Height}
          className="image"
          onDragStart={(e) => {
            imageDragged(e.target.src);
            //console.log(URL);
          }}
        ></img>
      </div>
    </div>
  );
}
export default ImageDrawer;
