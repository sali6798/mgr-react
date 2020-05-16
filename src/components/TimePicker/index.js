import React from "react";
import { KeyboardTimePicker } from '@material-ui/pickers';

function TimePicker(props) {
    return (
        <KeyboardTimePicker
            margin="normal"
            label={props.timeLabel}
            value={props.timeLabel === "Start Time" ? props.startDate : props.endDate}
            onChange={props.handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
        />
    );
}

export default TimePicker;