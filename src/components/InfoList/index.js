import React, { useState } from "react";
import moment from "moment"
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import API from "../../utils/API"

function InfoList(props) {
    const count = Math.floor(Math.random() * 1000);

    const displayList = () => {

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

        const renderArtists = element => {
            return (
                <ListItem key={element._id ? element._id : count}>
                    <ListItemText
                        primary={element.name}
                        secondary={element.email}
                    />
                    {props.delete ? displayButton(element._id) : ""}
                </ListItem>
            );
        }

        const renderEvents = element => {
            return (
                <ListItem key={element._id ? element._id : count} button component="a" onClick={props.handleEdit}>
                    <ListItemText
                        primary={element.eventTitle}
                        secondary={`${moment(element.release).format("dddd, LL")}`}
                    />
                </ListItem>
            );
        }

        return (
            <List>
                {props.array.map(element => props.listType ? renderArtists(element) : renderEvents(element))}
            </List>
        );
    }

    const displayError = () => {
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