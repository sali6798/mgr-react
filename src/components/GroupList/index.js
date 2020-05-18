import React from "react";
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import API from "../../utils/API"

function GroupList(props) {
    const handleClick = id => {
        API.removeGroup(id)
        .then(() => props.loadGroups())
        .catch(err => console.log(err))
    }

    const displayButton = id => {
        return (
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleClick(id)}>
                    <ClearIcon />
                </IconButton>
            </ListItemSecondaryAction>
        );
    }

    return (
        <ListItem button component="a" href={"/manage/" + props._id}>
            <ListItemText>
                {props.name}
            </ListItemText>
            {props.delete ? displayButton(props._id) : ""}
        </ListItem>
    );
}

export default GroupList;