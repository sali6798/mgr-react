import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Grid, Paper, Button, InputAdornment, InputLabel, IconButton, TextField, FormControl, OutlinedInput, FormHelperText, FormControlLabel, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import API from "../../utils/API"

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


function CreateAccount() {
    let history = useHistory();
    const classes = useStyles();

    const [values, setValues] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isManager: false,
        showPassword: false
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSwitch = () => {
        setValues({ ...values, isManager: !values.isManager })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = event => {
        event.preventDefault();
        const newUser = {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            password: values.password,
            isManager: values.isManager
        }

        API.signup(newUser)
            .then(({ data }) => {
                console.log(data)
                history.push("/dashboard")
            })
            .catch(err => console.log(err))

    }

    function validate(event, field) {
        event.preventDefault()
        switch (field) {
            case "password":
                if (values.password.length < 8) {
                    return "Password must be more than 8 characters"
                } else {
                    return ""
                }
        }


    }
    return (
        <Grid className={classes.grid} container spacing={1}>
            <Grid item xs={3} />
            <Grid item xs={6}>
                <Paper className={classes.paper} elevation={3} maxwidth="sm">
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <h3>Create Your Account</h3>
                        <div>
                            <TextField
                                required
                                label="First Name"
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                variant="outlined" />
                            <TextField
                                required
                                label="Last Name"
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                                variant="outlined" />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Email"
                                value={values.email}
                                onChange={handleChange('email')}
                                variant="outlined" />
                        </div>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    label="Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    error={values.password.length < 8}
                                    aria-describedby="password-error-length"
                                    onBlur={(event) => console.log(event.target.value)}

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
                                <FormHelperText id="password-error-length">Password must be more than 8 characters</FormHelperText>
                            </FormControl>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.confirmPassword}
                                    onChange={handleChange('confirmPassword')}
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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.isManager}
                                    onChange={handleSwitch}
                                    name="manager"
                                    color="primary"
                                />
                            }
                            label="Manager Account"
                        />
                        <div>
                            <Button className={classes.margin} variant="contained" color="primary" type="submit">
                                Create Account
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={3} />
        </Grid>
    )
}

export default CreateAccount;

