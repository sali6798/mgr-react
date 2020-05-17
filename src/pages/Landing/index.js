import React from "react";
import "./style.css";
import { Paper, Grid, Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(2),
        height: 200,
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    buttonMargin: {
        margin: theme.spacing(1),
      },
}));

function Landing() {
    const classes = useStyles();
    
    return (
    <div className={classes.root}>
        
    <Grid container spacing={3}>
        <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
                <h3>Managers</h3>
                <hr />
                <p>For all those managers and record label reps who want to wrangle their artists, click below to create an account or login.</p>
                <br />
                <Button  className={classes.buttonMargin} variant="contained" color="primary" href="/createaccount">
                        Create Account
                </Button>
                    <Button className={classes.buttonMargin} variant="contained" color="primary" href="/login">
                        Login
                </Button>
            </Paper>
        </Grid>
        <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
            <h3>Artists</h3>
                <hr />
                <p>I actually have no idea what you should do if your an artist.</p>
                <br />
                <Button variant="contained" color="primary">
                        What Do I Do?
<<<<<<< HEAD
                        
                    </Button>
=======
                </Button>
>>>>>>> development
            </Paper>
        </Grid>
    </Grid>
        
    </div>
    )
}

export default Landing;