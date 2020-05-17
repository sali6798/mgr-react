import React from "react";
import API from "../../utils/API"
import "./style.css"
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Grid, Paper, Button, InputAdornment, InputLabel, IconButton, TextField, FormControl, OutlinedInput } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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

function Login() {

    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: "",
        password: "",
        isManager: true,
        showPassword: false
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        API.login(
            {
                email: values.email,
                password: values.password
            }
        )
    }

    return (
        <Grid className={classes.grid} container spacing={1}>
            <Grid item xs={3} />
            <Grid item xs={6}>
                <Paper className={classes.paper} elevation={3} maxWidth="sm">
                    <form className={classes.root} noValidate autoComplete="off">
                        <h3>Login</h3>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                value={values.email}
                                onChange={handleChange('email')}
                                variant="outlined" />
                        </div>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    label="Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    minLength="8"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>
                        <br />
                        <div>
                            <Button className={classes.margin} variant="contained" color="primary">
                                Go Back
                </Button>
                            <Button className={classes.margin} variant="contained" color="primary" onClick={handleSubmitLogin}>
                                Submit
                </Button>
                        </div>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={3} />
        </Grid>

    )
}



export default Login;