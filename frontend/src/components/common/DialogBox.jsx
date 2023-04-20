import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const DialogBox = () => {
    const [openDialog, handleDisplay] = React.useState(false);
    
    const handleClose = () => {
       handleDisplay(false);
    };
    
    const openDialogBox = () => {
       handleDisplay(true);
    };
    const buttonStyle = {
       width: "10rem",
       fontsize: "1.5rem",
       height: "2rem",
       padding: "5px",
       borderRadius: "10px",
       backgroundColor: "green",
       color: "White",
       border: "2px solid yellow",
    };
    const divStyle = {
       display: "flex",
       felxDirection: "row",
       position: "absolute",
       right: "0px",
       bottom: "0px",
       // padding: "1rem",
    };
    const confirmButtonStyle = {
       width: "5rem",
       height: "1.5rem",
       fontsize: "1rem",
       backgroundColor: "grey",
       color: "black",
       margin: "5px",
       borderRadius: "10px",
       border: "1px solid black",
    };
    return (
    <>
        <button style = {buttonStyle} onClick = {openDialogBox}>
        Open Dialog
        </button>
        <Dialog onClose = {handleClose} open = {openDialog}>
        <DialogTitle> Confirm Dialog </DialogTitle>
        <h3 style = {{ marginTop: "-10px", padding: "5px 10px" }}>
                Are you sure to delete the item? {" "}
        </h3>
        <br></br>
        <div style = {divStyle}>
            <button style = {confirmButtonStyle} onClick = {handleClose}>
                Confirm
            </button>
            <button style = {confirmButtonStyle} onClick = {handleClose}>
                Cancel
            </button>
        </div>
        </Dialog>

    </>
  )
}

export default DialogBox;