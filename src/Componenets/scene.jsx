import React, { useState } from "react";
import _uniqueId from "lodash/uniqueId";
import { TextField } from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import "./scene.css";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Scene(props) {
  const {
    value,
    length,
    selected,
    switchScene,
    onDelete,
    saveCurrentScene,
    sendXML,
    downloadXML,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className="bod">
        <div>
          <button
            onClick={() => {
              switchScene(value);
            }}
            className="show"
          >
            {" "}
            Scene{" "}
          </button>
        </div>

        <div className="trash">
          {length > 1 && (
            <button
              onClick={() => onDelete(value)}
              className="btn btn-danger m-2"
              id="trash"
            >
              <BsFillTrashFill />
            </button>
          )}

          <Button variant="outlined" onClick={handleClickOpen} id="down">
            <AiOutlineCloudDownload />
          </Button>
          <button
            onClick={() => {
              saveCurrentScene(value);
            }}
            className="btn btn-success m-2"
            id="s"
          >
            S
          </button>
        </div>
      </div>
      {selected && (
        <>
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>XML</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <TextField
                    label="import XML"
                    id="XML-Field"
                    sx={{ m: 1, width: "25ch" }}
                    /* InputProps={{
              startAdornment: "XML",
            }}*/
                    variant="filled"
                    onChange={(e) => {
                      sendXML(e.target.value);
                    }}
                  />
                </DialogContentText>
                <button onClick={() => downloadXML(value)} id="down">
                  <AiOutlineCloudDownload />
                </button>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Set</Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}

export default Scene;
