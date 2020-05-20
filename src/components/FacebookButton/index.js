import React from "react";
import { Button } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import "./style.css"

function FacebookButton(props) {
    return (
        <Button
            variant="contained"
            className="FacebookButton"
            startIcon={<FacebookIcon />}
            onClick={props.handleClick}
        >
            {props.text}
        </Button>
    );
}

export default FacebookButton;