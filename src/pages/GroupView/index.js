import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, List, ListItem, TextField } from '@material-ui/core';
import "./style.css";
import NotAuthorized from "../../pages/NotAuthorized"
import API from "../../utils/API";
import GroupList from "../../components/GroupList"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    grid: {
        flexGrow: 1,
        marginTop: 20,
    },
    field: {
        width: "100%"
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

// function ListItemLink(props) {
//     return <ListItem button component="a" {...props} />;
// }

function GroupView() {
    const classes = useStyles();
    const [groups, setGroups] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [name, setName] = useState("");
    const [deleteGroup, setDeleteGroup] = useState(false);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        API.readSessions()
            .then(({ data }) => {
                setManager(data.isManager);
                if (data.isManager === true) {
                    loadGroups();
                }
            })
            .catch(err => console.log(err))
    }, [])

    const loadGroups = () => {
        API.getGroups()
            .then(({ data }) => setGroups(data))
            .catch(err => console.log(err));
    }

    const handleAddClick = () => {
        setAddUser(!addUser)
    }

    const handleRemoveClick = () => {
        setDeleteGroup(!deleteGroup)
    }

    const handleInputChange = event => {
        setName(event.target.value)
    }

    const handleSubmit = () => {
        API.createGroup({ name: name })
            .then(() => {
                setAddUser(!addUser);
                loadGroups();
                setName("");
            })
            .catch(err => console.log(err))
    }

    function renderGroups() {
        return (
            <Grid className={classes.grid} container spacing={1}>

                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Paper className={classes.paper} elevation={3}>
                        <h1>Your Groups</h1>
                        <hr />

                        <List component="nav" aria-label="group names">
                            {groups.length > 0 ? groups.map(group => <GroupList key={group._id} {...group} delete={deleteGroup} loadGroups={loadGroups} />) : <h3>No Groups Yet</h3>}
                            {addUser ? <ListItem><TextField className={classes.field} label="Group Name" variant="outlined" value={name} onChange={handleInputChange} /><Button onClick={handleSubmit}>Add</Button></ListItem> : ""}
                        </List>
                        <br />
                        <div>
                            <Button className={classes.margin} variant="contained" color="primary" onClick={handleAddClick}>{addUser ? "Cancel" : "Add Group"}</Button>
                            {groups.length > 0
                                ? <Button className={classes.margin} variant="contained" color="primary" onClick={handleRemoveClick}>{deleteGroup ? "Done" : "Remove Group"}</Button>
                                : ""
                            }
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3} />
            </Grid>
        );
    }

    return <div>{manager === true ? renderGroups() : <NotAuthorized />}</div>
}

export default GroupView;