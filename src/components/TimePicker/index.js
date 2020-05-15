import React from "react";
import { KeyboardTimePicker } from '@material-ui/pickers';

function TimePicker(props) {
    return (
        <KeyboardTimePicker
            margin="normal"
            // id="time-picker"
            label="Time"
            value={props.selectedDate}
            onChange={props.handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
        />
    );
}

export default TimePicker;