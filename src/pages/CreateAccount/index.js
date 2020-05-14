import React from "react";
import "./style.css";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Container, Button, InputAdornment, InputLabel, IconButton, TextField, FormControl, OutlinedInput, FormHelperText } from '@material-ui/core'
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
}));


function CreateAccount() {

    const classes = useStyles();

    const [values, setValues] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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

    function validate(event, field) {
        event.preventDefault()
        switch(field) {
            case "password":
                if (values.password.length < 8) {
                    return "Password must be more than 8 characters"
                } else {
                    return ""
                }
        }

    
    } 
    return (
        <Container maxWidth="sm">
        <form className={classes.root} noValidate autoComplete="off">
            <h3>Create Your Account</h3>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    variant="outlined" />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    variant="outlined" />
            </div>
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
                        error={values.password.length < 8}
                        aria-describedby= "password-error-length"
                        onBlur= {(event) => console.log(event.target.value)}
    
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
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        label="Confirm Password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        minLength= "8"
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
            <br></br>
            <div>
                <Button variant="contained" color="primary">
                    Go Back
                </Button>
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </form>
        </Container>
    )
}

export default CreateAccount;

