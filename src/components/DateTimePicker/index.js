import React from 'react';
import "moment";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DatePicker from "../DatePicker"
import TimePicker from "../TimePicker"

function DateTimePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            {!props.allDay
                ? <div><DatePicker {...props} /> <TimePicker {...props} /></div>
                : <DatePicker {...props} />
            }
        </MuiPickersUtilsProvider>
    );
}

export default DateTimePicker;