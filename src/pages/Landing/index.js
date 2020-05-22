import React from "react";
import "./style.css";
import { Paper, Grid, Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
        width: "80%",
        margin: "0 auto",
    },
    paper: {
        padding: theme.spacing(2),
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
    
    <div>
    <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper className={classes.paper} elevation={3}>
                <h1>Welcome to MGR</h1>
                <hr />
                <p>MGR is an application that helps managers and artists track deadlines and social media commitments with shared calendars and cloud-based file sharing. Our goal is to automate the process of communicating important dates, managing social media scheduling, and sharing content necessary for artist promotion in a simple & seamless experience. 
</p>
                <br />
             
            </Paper>
        </Grid>
        </Grid>
    </div>
    
    <div className={classes.root}>
        
    <Grid container spacing={3}>
        <Grid item sm={6}>
            <Paper className={classes.paper} elevation={3}>
                <h3>Managers</h3>
                <hr />
                <p>Set promotion deadlines and add content that your artist can easily access to take the hassle out of social media management. </p>
                <br />
                <Button  className={classes.buttonMargin} variant="contained" color="primary" href="/createaccount">
                        Create Account
                </Button>
                    <Button className={classes.buttonMargin} variant="contained" color="primary" href="/login">
                        Login
                </Button>
            </Paper>
        </Grid>
        <Grid item sm={6}>
            <Paper className={classes.paper} elevation={3}>
            <h3>Artists</h3>
                <hr />
                <p>Artists can check their calendar and get email notifications when it's time to post to their networks, with a link to the graphics and content provided by managers for quick posting.</p>
                <br />
                <Button  className={classes.buttonMargin} variant="contained" color="primary" href="/createaccount">
                        Create Account
                </Button>
                    <Button className={classes.buttonMargin} variant="contained" color="primary" href="/login">
                        Login
                </Button>
            </Paper>
        </Grid>
    </Grid>
        
    </div>
    </div>
    )
}

export default Landing;