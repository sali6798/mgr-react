import React from "react";
import moment from "moment"
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import API from "../../utils/API"

function InfoList(props) {
    function displayList() {

        const handleClick = id => {
            API.removeGroupArtist({
                groupId: props.groupId,
                id: id
            })
            .then(() => props.loadArtists())
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
            <List>
                {props.array.map(element => {
                    return (
                        <ListItem key={element._id}>
                            <ListItemText
                                primary={props.listType ? element.name : element.eventTitle}
                                secondary={props.listType ? element.email : `${moment(element.release).format("dddd, LL")} - ${element.status}`}
                            />
                            {props.delete ? displayButton(element._id) : ""}
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    function displayError() {
        switch (props.status) {
            case "ready":
                return <h3>Nothing Scheduled Today</h3>;
            case "draft":
                return <h3>No Drafts</h3>;
            case "later":
                return <h3>Nothing Scheduled</h3>;
            default:
                return <h3>No Artists</h3>;
        }
    }

    return (
        <div>
            {props.array.length > 0 ? displayList() : displayError()}
        </div>
    );
}

export default InfoList;