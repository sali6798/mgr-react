import React from "react";
import "./style.css";
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import classes from "*.module.css";

const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
};

const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
};

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

export default function CheckboxLabels() {
    const [state, setState] = React.useState({
      checkedB: false,
    });


function CreateAccount() {
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <h3>Create Your Account</h3>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue="First"
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    variant="outlined" />
                <TextField required id="outlined-required" label="Last Name" defaultValue="Last" variant="outlined" />
            </div>
            <div>
                <TextField required id="outlined-required" label="Username" defaultValue="Username" variant="outlined" />
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
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        label="Confirm Password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Primary"
                />
            </div>
        </form>
    )
}

export default CreateAccount;