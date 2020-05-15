import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    List
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DateTimePicker from "../DateTimePicker";
import Item from "../Item";


function PostForm() {
    // The first commit of Material-UI

    const [allDay, setAllDay] = useState(false);
    const [releaseStatus, setReleaseStatus] = useState("draft");
    const [imgPath, setImgPath] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        console.log(date)
        setSelectedDate(date);
    };

    const handleChange = event => {
        // console.log(selectedDate)
        setAllDay(event.target.checked);
    };

    const handleClick = event => {
        setReleaseStatus(event.target.value);
    }

    const uploadIMG = async () => {
        // make object
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

    const selectFile = (e) => {
        let file = e.target.files[0];
        setImgPath(file);       // Set file to state
    }


    const displayScheduler = () => {
        return (
            <div>
                <FormGroup >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={allDay}
                                onChange={handleChange}
                                name="allDay"
                                color="primary"
                            />
                        }
                        label="All Day"
                    />
                </FormGroup>
                <DateTimePicker selectedDate={selectedDate} handleDateChange={handleDateChange} allDay={allDay} />
            </div>
        );
    }

    const handleDelete = id => {
        const newUploads = uploads.filter(upload => upload.id !== id);
        setUploads(newUploads);
    }

    return (
        <form noValidate autoComplete="off">
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
            >

                <TextField label="Title" variant="outlined"></TextField>

                <TextField
                    id="outlined-multiline-static"
                    label="Post Body"
                    multiline
                    rows={4}
                    variant="outlined"
                />
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
                <List>
                    {uploads.map(upload => <Item key={upload.id} {...upload} handleDelete={handleDelete} />)}
                </List>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Schedule Release</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="draft" >
                        <FormControlLabel value="draft" control={<Radio color="primary" onClick={handleClick} />} label="Not Ready" />
                        <FormControlLabel value="ready" control={<Radio color="primary" onClick={handleClick} />} label="Send out now" />
                        <FormControlLabel value="later" control={<Radio color="primary" onClick={handleClick} />} label="Schedule for later" />
                    </RadioGroup>
                </FormControl>

                {releaseStatus === "later" ? displayScheduler() : ""}
            </Grid>
        </form>
    );
}

export default PostForm;
