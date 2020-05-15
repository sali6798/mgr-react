import React from "react";
import { KeyboardDatePicker } from '@material-ui/pickers';

function DatePicker(props) {
    return (
        <KeyboardDatePicker
            margin="normal"
            // id="date-picker-dialog"
            label="Date"
            format="DD/MM/YYYY"
            value={props.selectedDate}
            onChange={props.handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
    );
}

export default DatePicker;