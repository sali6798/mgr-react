import React from "react";
import { Button } from "@material-ui/core";
import TwitterIcon from '@material-ui/icons/Twitter';
import "./style.css"

function TwitterButton(props) {
    return (
        <Button
            variant="contained"
            className="TwitterButton"
            startIcon={<TwitterIcon />}
            onClick={props.handleClick}
        >
            {props.text}
        </Button>
    );
}

export default TwitterButton;