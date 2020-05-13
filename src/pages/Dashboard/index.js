// import React, { useState, useEffect } from "react";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function Dashboard() {
//     const [date, setDate] = useState(new Date())

//     const handleDateChange = date => {
//         setDate(date);
//     }

//     const onDrillDown = ({ activeStartDate, view }) => alert('Drilled down to: ', activeStartDate, view)
//     const onClickDay = (value, event) => alert('Clicked day: ', value)

//     return (
//         <div>
//             <Calendar
//                 onChange={handleDateChange}
//                 value={date}
//                 onDrillDown={onDrillDown}
//                 onClickDay={onClickDay}
//             />
//         </div>
//     );
// }

// export default Dashboard;

import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

// import { styles, Modal, Backdrop, Fade } from "@material-ui/core"

// import './main.scss'
// const useStyles = styles.makeStyles((theme) => ({
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));

function Dashboard() {

    const calendarComponentRef = React.createRef()
    const [events, createEvents] = useState([
        { title: 'Event Now', start: new Date() }
    ])

    // state = {
    //     // calendarWeekends: true,
    //     calendarEvents: [ // initial event data
    //         { title: 'Event Now', start: new Date() }
    //     ]
    // }

    const handleDateClick = (arg) => {
        // alert(arg.dateStr)
        let calendarApi = calendarComponentRef.current.getApi()
        calendarApi.changeView('timeGridDay', arg.dateStr);
        // this.calendarComponentRef
        //   const result = confirm('Would you like to add an event to ' + arg.dateStr + ' ?');
        // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        //   this.setState({  // add new event data
        //     calendarEvents: this.state.calendarEvents.concat({ // creates a new array
        //       title: 'New Event',
        //       start: arg.date,
        //       allDay: arg.allDay
        //     })
        //   })
        // }
    }

    const addCalendarEvent = () => {
        var dateStr = prompt('Enter a date in YYYY-MM-DD format');
        var date = new Date(dateStr + 'T00:00:00'); // will be in local time

        // if (!isNaN(date.valueOf())) { // valid?
        //     calendar.addEvent({
        //         title: 'dynamic event',
        //         start: date,
        //         allDay: true
        //     });
        //     alert('Great. Now, update your database...');
        // } else {
        //     alert('Invalid date.');
        // }
    }


    return (
        <div className='demo-app'>
            {/* <div className='demo-app-top'> */}
                {/* <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;
            <button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp; */}
            {/* (also, click a date/time to add an event)
            </div> */}
            <div className='demo-app-calendar'>
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,next today addEventButton',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    customButtons={{
                        addEventButton: {
                            text: 'Add event',
                            click: addCalendarEvent
                            
                            // function () {
                                
                            // }
                        }
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    ref={calendarComponentRef}
                    // weekends={ this.state.calendarWeekends }
                    events={events}
                    dateClick={handleDateClick}
                />
            </div>
        </div>
    )


    //   toggleWeekends = () => {
    //     this.setState({ // update a property
    //       calendarWeekends: !this.state.calendarWeekends
    //     })
    //   }

    //   gotoPast = () => {
    //     let calendarApi = this.calendarComponentRef.current.getApi()
    //     calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    //   }



}

export default Dashboard;