import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list';
import moment from "moment";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import {
    Modal,
    Backdrop,
    Fade,
    Button,
    FormControlLabel,
    FormGroup,
    Grid,
    Switch,
    TextField
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import DateTimePicker from "../../components/DateTimePicker";
import API from '../../utils/API'

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
    const [myEvents, setMyEvents] = useState([])

    const [events, setEvents] = useState([])

    const [chosenDate, setChosenDate] = useState({
        allDay: false,
        startDate: new Date(),
        endDate: new Date()
    })

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        async function init() {
            try {
                const { data: user } = await API.readSessions();
                console.log(user)

                if (user.isManager) {
                    const { data: groups } = await API.getGroups();
                    console.log(groups)

                    // if (groups.length > 0) {
                    //     let posts = [];
                    //     const groupPosts = groups.filter(group => group.posts.length > 0).map(group => group.posts)
                    //     console.log(groupPosts)

                    //     if (groupPosts.length > 0) {
                    //         posts = posts.concat(...groupPosts)
                    //         const groupEvents = posts.map(post => {
                    //             const eventObj = {
                    //                 title: post.eventTitle,
                    //                 description: post.body,
                    //                 start: post.release,
                    //                 allDay: true
                    //             }

                    //             return eventObj;
                    //         })

                    //         setEvents(events.concat(groupEvents))
                    //     }
                    // }
                    renderEvents(groups);
                }
                else {
                    const { data } = await API.getUserGroupInfo(user._id);
                    // let posts = [];
                    // const groupPosts = data.groups.filter(group => group.posts.length > 0).map(group => group.posts)
                    // if (groupPosts.length > 0) {
                    //     posts = posts.concat(...groupPosts)
                    //     const groupEvents = posts.map(post => {
                    //         const eventObj = {
                    //             title: post.eventTitle,
                    //             description: post.body,
                    //             start: post.release,
                    //             allDay: true
                    //         }

                    //         return eventObj;
                    //     })

                    //     setEvents(events.concat(groupEvents))
                    // }
                    renderEvents(data.groups)
                }

                setMyEvents(user.myEvents)

            }
            catch (err) {
                console.log(err)
            }
        }

        init();
    }, [])

    function renderEvents(groups) {
        if (groups.length > 0) {
            let posts = [];
            const groupPosts = groups.filter(group => group.posts.length > 0).map(group => group.posts)
            console.log(groupPosts)

            if (groupPosts.length > 0) {
                posts = posts.concat(...groupPosts)
                const groupEvents = posts.map(post => {
                    const eventObj = {
                        title: post.eventTitle,
                        description: post.body,
                        start: post.release,
                        allDay: true
                    }

                    return eventObj;
                })

                setEvents(events.concat(groupEvents))
            }
        }
    }

    useEffect(() => {
        API.updateMyEvents({ events: myEvents })
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err))
    }, [myEvents])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle("");
        setDescription("");
        setChosenDate({
            allDay: false,
            startDate: new Date(),
            endDate: new Date()
        });
    };

    const handleDateClick = arg => {
        if (arg.view.type === "dayGridMonth") {
            let calendarApi = calendarComponentRef.current.getApi()
            calendarApi.changeView('timeGridDay', arg.dateStr);
        }
        else {
            console.log(arg)
            setChosenDate({
                allDay: arg.allDay,
                startDate: arg.date,
                endDate: arg.date
            });

            handleOpen();
        }
    }

    const handleEndDateChange = (date) => {
        console.log(date)
        setChosenDate({ ...chosenDate, endDate: date._d })
    }

    const handleStartDateChange = (date) => {
        console.log(date._d)
        setChosenDate({ ...chosenDate, startDate: date._d })
    }

    const addCalendarEvent = () => {
        handleOpen();
    }

    const calculateEndDate = () => {
        if (chosenDate.allDay && chosenDate.endDate > chosenDate.startDate) {
            return moment(chosenDate.endDate).add(1, "days")._d;
        }

        return chosenDate.endDate;
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(chosenDate)
        setMyEvents(myEvents.concat({
            title: title,
            description: description,
            start: chosenDate.startDate,
            end: calculateEndDate(),
            allDay: chosenDate.allDay,
            backgroundColor: "darkorange",
            borderColor: "darkorange"
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

    const handleChange = event => {
        setChosenDate({ ...chosenDate, allDay: event.target.checked })
    };

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
                    events={events.concat(myEvents)}
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
                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="space-around"
                                    alignItems="center"
                                >
                                    <TextField label="Event Title" variant="outlined" name="title" value={title} onChange={handleInputChange} required></TextField>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        name="description"
                                        value={description}
                                        onChange={handleInputChange}
                                    />

                                    <FormGroup >
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={chosenDate.allDay}
                                                    onChange={handleChange}
                                                    name="allDay"
                                                    color="primary"
                                                />
                                            }
                                            label="All Day"
                                        />
                                    </FormGroup>

                                    <DateTimePicker {...chosenDate} dateLabel="Start Date" timeLabel="Start Time" handleDateChange={handleStartDateChange} />
                                    <DateTimePicker {...chosenDate} dateLabel="End Date" timeLabel="End Time" handleDateChange={handleEndDateChange} />
                                    <Button variant="contained" color="primary" type="submit">Save</Button>
                                </Grid>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}

export default Dashboard;