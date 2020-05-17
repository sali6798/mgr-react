import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemText, Grid, Button } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import "./style.css";
import API from "../../utils/API";

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
    margin: {
        margin: theme.spacing(1),
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function GroupView() {
    const classes = useStyles();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // API.readSessions()
        // .then({ _id } => )

        API.getGroups()
        .then(({data}) => setGroups(data))
        .catch(err => console.log(err));
    }, [])

    return (

        <Grid className={classes.grid} container spacing={1}>

            <Grid item xs={3} />
            <Grid item xs={6}>
                <Paper className={classes.paper} elevation={3}>
                    <h1>Your Groups</h1>
                    <hr />
                    <List component="nav" aria-label="secondary mailbox folders">
                        {/* <ListItemLink href=" ">
                            <ListItemText primary="Group 1" />
                        </ListItemLink>
                        <ListItemLink href=" ">
                            <ListItemText primary="Group 2" />
                        </ListItemLink>
                        <ListItemLink href=" ">
                            <ListItemText primary="Group 3" />
                        </ListItemLink> */}
                        {groups.map(group => <ListItemLink key={group._id} href={"/manage/" + group._id}><ListItemText>{group.name}</ListItemText></ListItemLink>)}
                    </List>
                    <br />
                    <div>
                    
                            <Button className={classes.margin} variant="contained" color="primary">
                                Remove Group
                </Button>
                            <Button className={classes.margin} variant="contained" color="primary">
                                Add Group
                </Button>
                        </div>
                </Paper>
            </Grid>
            <Grid item xs={3} />
        </Grid>

    )
}

export default GroupView;