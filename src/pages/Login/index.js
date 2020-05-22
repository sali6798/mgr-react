import React from "react";
import { useHistory } from "react-router-dom";
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
    const history = useHistory();
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
        const user = {
            username: values.email,
            password: values.password
        }

        API.login(user)
        .then(({ data }) => {
            if (data) {
                history.push("/dashboard");
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <Grid className={`${classes.grid} Login`} container spacing={1} justify="center">
            <Grid item sm={6}>
                <Paper className={classes.paper} elevation={3} maxwidth="sm">
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmitLogin}>
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
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" >
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
                            <Button className={classes.margin} variant="contained" color="primary" type="submit" >
                                Log In
                            </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>

    )
}



export default Login;