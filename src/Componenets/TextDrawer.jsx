import React from "react";

import styles from "./TextDrawer.module.css";
import scrollbar from "./scrollbar.css";
import { height } from "@mui/system";

const mockupResponse = [
  // need default width height and desc to search
  {
    id: 1,
    text: "Add a heading",
    fontWeight: 800,
    fontSize: 28,
    fontFamily: "Open Sans",
  },
  {
    id: 2,
    text: "Add a subheading",
    fontWeight: 400,
    fontSize: 18,
    fontFamily: "Open Sans",
  },
  {
    id: 3,
    text: "Add a little bit of body text",
    fontWeight: 300,
    fontSize: 12,
    fontFamily: "Open Sans",
  },
];

class TextDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: false };
  }

  getTextWidth(text, font) {
    const canvas =
      this.canvas || (this.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    // console.log(text, font, metrics.width);
    return metrics.width;
  }

  addElement({ text, fontWeight, fontSize, fontFamily }) {
    const { addElement, zoom } = this.props;
    const element = {
      elementableType: "Text",
      transparency: 1,
      zIndex: 0,
      posX: 0,
      posY: 0,
      // _destroy: true
      elementableAttributes: {
        color: "#000000",
        text,
        fontFamily,
        fontWeight,
        fontSize,
        height: fontSize,
        width:
          this.getTextWidth(text, `${fontWeight} ${fontSize}px ${fontFamily}`) +
          10,
      },
    };
    addElement(element);
  }

  render() {
    return (
      <>
        <div
          className={scrollbar.customScroll}
          style={{
            height: "100%",
          }}
        >
          <div className={styles.textDrawer}>
            <h3 className={styles.h3}>Click Text to add to page</h3>
            <div className={styles.highlights}>
              <div
                className={`${styles.highlightItem} ${styles.heading}`}
                onClick={() => this.addElement(mockupResponse[0])}
              >
                <button onClick={() => this.props.insertText("Large")}>
                  <p>Add a heading</p>
                </button>
              </div>
              <div
                className={`${styles.highlightItem} ${styles.subheading}`}
                onClick={() => this.addElement(mockupResponse[1])}
              >
                <button onClick={() => this.props.insertText("Medium")}>
                  <p>Add a subheading</p>
                </button>
              </div>
              <div
                className={`${styles.highlightItem} ${styles.body}`}
                onClick={() => this.addElement(mockupResponse[2])}
              >
                <button onClick={() => this.props.insertText("small")}>
                  <p>Add a little bit of body text</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TextDrawer;
