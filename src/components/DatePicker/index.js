import React from "react";
import { KeyboardDatePicker } from '@material-ui/pickers';

function DatePicker(props) {
    function dateType() {
        switch(props.dateLabel) {
            case "Send Date":
                return props.selectedDate;
            case "Start Date":
                return props.startDate;
            default:
                return props.endDate;
        }
    }

    return (
        <KeyboardDatePicker
            margin="normal"
            label={props.dateLabel}
            format="MM/DD/YYYY"
            value={dateType()}
            onChange={props.handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
    );
}

export default DatePicker;