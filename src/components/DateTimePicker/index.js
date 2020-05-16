import React from 'react';
import "moment";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
import DatePicker from "../DatePicker"
import TimePicker from "../TimePicker"

function DateTimePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            {!props.allDay
                ? <Grid><DatePicker {...props} /><TimePicker {...props} /></Grid>
                : <DatePicker {...props} />
            }
        </MuiPickersUtilsProvider>
    );
}

export default DateTimePicker;