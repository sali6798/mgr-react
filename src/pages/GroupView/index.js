import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemText, Grid, } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import "./style.css";

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
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function GroupView() {

    const classes = useStyles();

    return (

        <Grid className={classes.grid} container spacing={1}>

            <Grid item xs={3} />
            <Grid item xs={6}>
                <Paper className={classes.paper} elevation={3}>
                    <h1>Your Groups</h1>
                    <hr />
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItemLink href=" ">
                            <ListItemText primary="Group 1" />
                        </ListItemLink>
                        <ListItemLink href=" ">
                            <ListItemText primary="Group 2" />
                        </ListItemLink>
                        <ListItemLink href=" ">
                            <ListItemText primary="Group 3" />
                        </ListItemLink>
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={3} />
        </Grid>

    )
}

export default GroupView;