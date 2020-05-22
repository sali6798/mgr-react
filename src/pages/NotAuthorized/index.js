import React from "react";
import "./style.css"
import { Grid, Paper, Button, InputAdornment, InputLabel, IconButton, TextField, FormControl, OutlinedInput, FormHelperText, FormControlLabel, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    grid: {
        flexGrow: 1,
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));

function NotAuthorized() {

    const classes = useStyles();

    return (
    
    <Grid className={classes.grid} container spacing={1}>
        <Grid item xs={3} />
        <Grid item xs={6} >
            <Paper className={classes.paper} elevation={3} maxwidth="sm">
                <form className={classes.root} noValidate autoComplete="off">
                    <h3>Not Authorized</h3>
                    <hr />
                    <p>
                        Please create an account or log in to see this page.
                    </p>

                </form>
            </Paper>
        </Grid>
        <Grid item xs={3} />
    </Grid>
    )
}

export default NotAuthorized;