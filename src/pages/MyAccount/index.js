import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Grid, Paper, Button, InputAdornment, InputLabel, IconButton, TextField, FormControl, OutlinedInput, FormHelperText, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import API from "../../utils/API"
import FacebookButton from "../../components/FacebookButton";
import TwitterButton from "../../components/TwitterButton";

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

function MyAccount() {
    const classes = useStyles();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isManager: false,
        showPassword: false,
        facebookPages: []
    })
    const [user, setUser] = useState([]);


    useEffect(() => {
        API.readSessions()
            .then(({ data }) => {
                console.log(data);

                let cutName = data.name.split(" ");
                setValues({
                    firstName: cutName[0],
                    lastName: cutName[1],
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.password,
                    isManager: data.isManager,
                    showPassword: false
                })
            })
            .catch(err => console.log(err));

    }, [])

    // UPDATE UserFanpage   //***************************************************************************** 
    // useEffect(() => {
    //     API.getPagesinfo()
    //         .then(({ data }) => {
    //             //setValues({ ...values, facebookPages: data })
    //             console.log(data)
    //             setUser(data);

    //         })
    // }, [])


    const error = 5 === 0;
    // const error = values.facebookPages.length === 0;

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = event => {
        event.preventDefault();
        // const newUser = {
        //     name: `${values.firstName} ${values.lastName}`,
        //     email: values.email,
        //     password: values.password,
        //     isManager: values.isManager
        // }

        // API.signup(newUser)
        //     .then(({ email, password }) => API.login({ username: email, password: password }))
        //     .then(({ data }) => {
        //         console.log(data)

        //         // history.push("/dashboard")
        //     })

        API.updateUser({ facebookPages: user })
            .catch(err => console.log(err))

    }

    const handleFBlogin = () => {
        window.location.href = "http://localhost:8080/auth/facebook"
        // window.location.href = "https://mgrserver.herokuapp.com/auth/facebook"
    }

    const handleTWlogin = () => {
        // window.location.href = "https://mgrserver.herokuapp.com/auth/twitter"
        window.location.href = "http://localhost:8080/auth/twitter"
    }

    return (
        <Grid className={classes.grid} container spacing={1} justify="center">
            <Grid item sm={6}>
                <Paper className={classes.paper} elevation={3} maxwidth="sm">
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <h3>My Account</h3>
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
                                variant="outlined"
                                disabled
                            />
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
                        <div>
                            <TwitterButton text="Link" handleClick={handleTWlogin} />
                        </div>
                        <br />
                        <div>
                            <FacebookButton text="Link" handleClick={handleFBlogin} />
                        </div>
                        <div>

                            {/* check if they have id from sessions
                                check if they have facebook pages
                                then render below and map FormControlLabel
                                handle OnChange function to FormControlLabel 
                                comment out error variable near the top of the page, implement however
                                https://material-ui.com/components/checkboxes/
                            */}

                            {/* <FormControl required error={error} component="fieldset">
                                <FormLabel component="legend">Pick Pages To Post To</FormLabel>

                                <FormGroup>
                                    RENDER PAGE NAME 
                                    {user.map((item) => (
                                        <FormControlLabel key={item.id}
                                            control={<Checkbox checked={false} onChange={handleChange} name={item.name}  />}
                                            label={item.name} />))}

                                </FormGroup>
                                <FormHelperText>Must Pick At Least One!</FormHelperText>
                            </FormControl> */}

                        </div>
                        <div>
                            <Button className={classes.margin} variant="contained" color="primary" type="submit">
                                Save Changes
                        </Button>
                        </div>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default MyAccount;