import React from 'react';
import "moment";
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

function DateTimePicker() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            {/* <Grid container justify="space-around"> */}
            <KeyboardDatePicker
                margin="normal"
                // id="date-picker-dialog"
                label="Date"
                format="L"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <KeyboardTimePicker
                margin="normal"
                // id="time-picker"
                label="Time"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
            />
            {/* </Grid> */}
        </MuiPickersUtilsProvider>
    );
}

export default DateTimePicker;