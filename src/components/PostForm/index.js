import React from "react";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
// import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function PostForm() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined"></TextField>
                <TextareaAutosize aria-label="minimum height" rowsMin={5} placeholder="Post Body" />
            </form>
            <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format={moment(selectedDate).format("MMM Do YY") }
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                {/* <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                /> */}
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default PostForm;