import React, { useState, useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import API from "../../utils/API";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        marginTop: theme.spacing(3),       
    },
}));

function Search(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [artists, setArtists] = React.useState([]);

    useEffect(() => {
        API.getAllUsers()
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }, [])

    const handleOnChange = (event, newValue) => {
        console.log(newValue)
        setArtists(newValue);
    }

    const handleSubmit = () => {
        if (artists.length > 0) {
            API.addGroupArtist({
                groupId: props.groupId,
                artists: artists
            })
            .then(() => {
                props.loadArtists();
            })
            .catch(err => console.log(err))
        }
        props.handleClose();
    }

    return (
        
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={users}
                onChange={handleOnChange}
                getOptionLabel={(option) => option.email}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Find Artist"
                        // placeholder="Add Artist"
                    />
                )}
            />
            <br/>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add Artists
            </Button>
        </div>
       
    );
}

export default Search;