import React from "react";
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function Item(props) {
    return (
        <ListItem>
            <ListItemText primary={props.name} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => props.handleDelete(props.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Item;