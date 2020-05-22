import React, { useState, useEffect } from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    List
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "moment";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DatePicker from "../DatePicker";
import Item from "../Item";
import API from "../../utils/API"


function PostForm(props) {
    // The first commit of Material-UI

    const [releaseStatus, setReleaseStatus] = useState(props.editPost ? props.editPost.status : "draft");
    const [imgPath, setImgPath] = useState({});
    const [uploads, setUploads] = useState([]);
    const [savedUploads, setSavedUploads] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (props.editPost) {
            setReleaseStatus(props.editPost.status);
            setSavedUploads(props.editPost.imageLinks);
            // setUploads(props.editPost.imageLinks);
            setSelectedDate(props.editPost.release);
            setTitle(props.editPost.eventTitle);
            setBody(props.editPost.body)
        }
    }, [])

    const handleDateChange = (date) => {
        console.log(date._d)
        setSelectedDate(date._d);
    };

    const handleClick = event => {
        setReleaseStatus(event.target.value);
    }

    function isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }

    const uploadIMG = async () => {

        console.log(imgPath)
        // make object
        if (!isEmpty(imgPath)) {
            const data = new FormData();
            data.append("file", imgPath);         // GET Value from state >> upload

            data.append("upload_preset", "udzc5qvv");
            // upload file
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/mgr/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );
            const file = await res.json();           // URL Link to picture
            // console.log(file)
            setUploads(uploads.concat({
                id: imgPath.name + uploads.length,
                name: imgPath.name,
                url: file.url
            }))
        }
    }

    const selectFile = (e) => {
        let file = e.target.files[0];
        setImgPath(file);       // Set file to state
    }


    const displayScheduler = () => {
        return (
            // <div>
            //     <FormGroup >
            //         <FormControlLabel
            //             control={
            //                 <Switch
            //                     checked={allDay}
            //                     onChange={handleChange}
            //                     name="allDay"
            //                     color="primary"
            //                 />
            //             }
            //             label="All Day"
            //         />
            //     </FormGroup>
            //     <DateTimePicker selectedDate={selectedDate} handleDateChange={handleDateChange} allDay={allDay} />
            // </div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker dateLabel="Send Date" selectedDate={selectedDate} handleDateChange={handleDateChange} />
            </MuiPickersUtilsProvider>
        );
    }

    const handleDelete = (...props) => {
        if (props.length > 1) {
            const newUploads = savedUploads.filter(upload => upload !== props[0]);
            setSavedUploads(newUploads);
        }
        else {
            const newUploads = uploads.filter(upload => upload.id !== props[0]);
            setUploads(newUploads);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const newPost = {
            eventTitle: title,
            body: body,
            imageLinks: uploads.length > 0 ? uploads.map(upload => upload.url) : savedUploads,
            release: selectedDate,
            status: releaseStatus,
            groupId: props.groupId,
            artists: props.artists.map(artist => artist.email)
        }

        console.log(newPost)

        if (!props.editPost) {
            API.createPost(newPost)
                .then(({ data }) => console.log(data))
                .then(() => {
                    props.handleClose();
                    props.loadPosts(newPost);
                    setUploads([])
                })
                .catch(err => console.log(err))
        }
        else {
            API.updatePost(props.editPost._id, newPost)
                .then(({ data }) => console.log(data))
                .then(() => {
                    props.handleClose();
                    props.loadPosts(newPost);
                    setSavedUploads([])
                })
                .catch(err => console.log(err))
        }


    }

    const handleInputChange = event => {
        const { name, value } = event.target;

        if (name === "title") {
            setTitle(value);
        }
        else {
            setBody(value)
        }
    }

    const displayUploads = () => {
        if (savedUploads.length > 0) {
            return savedUploads.map((upload, index) => <Item key={upload} name={upload} type="link" index={index} handleDelete={handleDelete} />)
        }

        return uploads.map(upload => <Item key={upload.id} {...upload} handleDelete={handleDelete} />)
    }

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid
                container
                direction="column"
                // justify="space-around"
                spacing={2}
                alignItems="center"
            >
                <Grid item>
                    <TextField label="Event Title" variant="outlined" name="title" value={title} onChange={handleInputChange} required></TextField>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-multiline-static"
                        label="Post Body (optional)"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="body"
                        value={body}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <Grid container alignItems="center" justify="center">
                        <input type="file" id="uploadImg" name="uploadImg" onChange={selectFile} />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUploadIcon />}
                            onClick={uploadIMG}
                        >
                            Upload
                    </Button>
                    </Grid>
                </Grid>

                {uploads.length > 0 || savedUploads.length > 0
                    ? <Grid item><List>{displayUploads()}</List></Grid>
                    : ""
                }

                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Schedule Release</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue={releaseStatus} >
                            <FormControlLabel value="draft" control={<Radio color="primary" onClick={handleClick} />} label="Not Ready" />
                            <FormControlLabel value="ready" control={<Radio color="primary" onClick={handleClick} />} label="Send out now" />
                            <FormControlLabel value="later" control={<Radio color="primary" onClick={handleClick} />} label="Schedule for later" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    {releaseStatus === "later" ? displayScheduler() : ""}
                </Grid>
                <Button variant="contained" color="primary" type="submit">Save</Button>
            </Grid>
        </form>
    );
}

export default PostForm;
