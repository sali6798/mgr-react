import React from "react";
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Link
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function Item(props) {
    return (
        <ListItem>
            {props.type
                ? <Link href={props.name} target="_blank" rel="noreferrer noopener">Image {props.index + 1}</Link>
                : <ListItemText primary={props.name} />
            }
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => props.type ? props.handleDelete(props.name, "link") : props.handleDelete(props.id)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Item;