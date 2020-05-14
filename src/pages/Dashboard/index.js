import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list';
import moment from "moment"

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import { Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Dashboard() {
    const calendarComponentRef = React.createRef()
    const [events, setEvents] = useState([
        { title: 'Event Now', start: new Date() }
    ])

    const [dateClicked, setDateClicked] = useState({
        allDay: false,
        date: new Date(),
        dateStr: ""
    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle("");
        setDescription("");
    };

    const handleDateClick = (arg) => {
        if(arg.view.type === "dayGridMonth") {
            let calendarApi = calendarComponentRef.current.getApi()
            calendarApi.changeView('timeGridDay', arg.dateStr);
        }
        else {
            handleOpen();
            setDateClicked({
                allDay: arg.allDay,
                date: arg.date,
                dateStr: arg.dateStr
            });
        }
    }

    const addCalendarEvent = () => {
        handleOpen();
    }

    const handleSubmit = event => {
        event.preventDefault();
        setEvents(events.concat({
            title: title,
            description: description,
            start: dateClicked.date,
            allDay: dateClicked.allDay
        }));

        handleClose();
    }

    const handleInputChange = event => {
        const { name, value } = event.target;

        if (name === "title") {
            setTitle(value);
        }
        else {
            setDescription(value)
        }
    }

    return (
        <div className='demo-app'>
            <div className='demo-app-calendar'>
                <FullCalendar
                    defaultView="dayGridMonth"
                    navLinks="true"
                    eventLimit="true"
                    header={{
                        left: 'prev,next today addEventButton',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    customButtons={{
                        addEventButton: {
                            text: 'Add event',
                            click: addCalendarEvent
                        }
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    ref={calendarComponentRef}
                    events={events}
                    dateClick={handleDateClick}
                />
            </div>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <form onSubmit={handleSubmit}>
                                <input placeholder="title" name="title" value={title} onChange={handleInputChange} required></input>
                                <input placeholder="description" name="description" value={description} onChange={handleInputChange}></input>
                                <input placeholder="date" onChange={handleDateClick} value={moment(dateClicked.date).format("l LT")}></input>
                                {/* <input placeholder="all day"></input>
                                <input placeholder="start"></input>
                                <input placeholder="end"></input> */}
                                <button type="submit">Add</button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}

export default Dashboard;