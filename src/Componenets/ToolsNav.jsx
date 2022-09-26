import React from "react";
import {
  FiLayout,
  FiImage,
  FiGrid,
  FiType,
  FiUploadCloud,
  FiDroplet,
  FiFolder,
  FiMoreHorizontal,
} from "react-icons/fi";
import styles from "./DesignDrawer.module.css";

const ToolsNav = ({ changeDrawer, current, closed, animate }) => {
  const activeButton = (id) =>
    current === id && !closed ? "active btn-tools" : "btn-tools";
  return (
    <div className={styles.toolsNav}>
      <nav className={styles.buttonsNav}>
        <button
          type="button"
          className={activeButton(0)}
          onClick={() => changeDrawer(0)}
        >
          <FiLayout />
          <span>Pick_Color</span>
        </button>
        <button
          type="button"
          className={activeButton(1)}
          onClick={() => changeDrawer(1)}
       >
         <div>
          <FiImage />
          </div>
          <span>Element</span>
        </button>
        <button
          type="button"
          className={activeButton(2)}
          onClick={() => changeDrawer(2)}
        >
          <div>
          <FiGrid />
          </div>
          <span>Importer</span>
        </button>
        <button
          type="button"
          className={activeButton(3)}
          onClick={() => changeDrawer(3)}
         
        >
          <div>
          <FiType />
          </div>
          <span>Text</span>
        </button>
        {/* <button type="button" className={activeButton(4)} onClick={() => changeDrawer(4)}>
          <FiDroplet />
          <span>Bkground</span>
        </button> */}
        <button
          type="button"
          className={activeButton(4)}
          onClick={() => changeDrawer(4)}
        >
        <div> <FiUploadCloud />
        </div>
          <span>More</span>
        </button>
        <button
          type="button"
          className={activeButton(5)}
          onClick={() => changeDrawer(5)}
        >
         
        </button>
      </nav>
    </div>
  );
};

export default ToolsNav;
