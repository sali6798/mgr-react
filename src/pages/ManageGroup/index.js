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
    margin: {
        margin: theme.spacing(1),
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function ManageGroup() {

    const classes = useStyles();

    return (

        <Grid className={classes.grid} container spacing={1}>

            <Grid item xs={3} />
            <Grid item xs={6}>
                <Paper className={classes.paper} elevation={3}>
                    <h1>Artists</h1>
                    <hr />
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItemLink href=" ">
                            <ListItemText primary="Artist 1" />
                        </ListItemLink>
                        <ListItemLink href=" ">
                            <ListItemText primary="Artist 2" />
                        </ListItemLink>
                        <ListItemLink href=" ">
                            <ListItemText primary="Artist 3" />
                        </ListItemLink>
                    </List>
                    <br />
                    <div>
                    
                            <Button className={classes.margin} variant="contained" color="primary">
                                Remove Artist
                </Button>
                            <Button className={classes.margin} variant="contained" color="primary">
                                Add Artist
                </Button>
                        </div>
                </Paper>
            </Grid>
            <Grid item xs={3} />
        </Grid>

    )
}

export default ManageGroup;