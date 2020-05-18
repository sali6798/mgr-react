import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, Fade, Modal, Backdrop } from '@material-ui/core';
import "./style.css";
import API from "../../utils/API";
import InfoList from "../../components/InfoList"
import PostForm from "../../components/PostForm"
// import FormModal from "../../components/FormModal"
import Search from "../../components/Search"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        // border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: "5px"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    grid: {
        flexGrow: 1,
        marginTop: 20,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

// function ListItemLink(props) {
//     return <ListItem button component="a" {...props} />;
// }

function ManageGroup() {
    const { id } = useParams();
    const [artists, setArtists] = useState([]);
    const [group, setGroup] = useState({});
    const [open, setOpen] = useState(false);
    const [addArtistOpen, setAddArtistOpen] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const classes = useStyles();


    useEffect(() => {
        loadArtists();
        loadGroup();
    }, [])

    const loadArtists = () => {
        API.getGroupArtists(id)
            .then(({ data }) => setArtists(data))
            .catch(err => console.log(err))
    }

    const loadGroup = () => {
        API.getSingleGroup(id)
            .then(({ data }) => {
                console.log(data);
                setGroup(data);
            })
            .catch(err => console.log(err))
    }

    const handleOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        if (addArtistOpen) {
            setAddArtistOpen(false);
        }
        else {
            setOpen(false);
        }
    };

    const handleArtistOpen = () => {
        setAddArtistOpen(true);
    }

    const handleClick = () => {
        setDeleteUser(!deleteUser);
    }


    return (
        <div>
            <h1>{group.name}</h1>
            <Grid className={classes.grid} container justify="space-evenly" spacing={2}>
                <Grid item sm={4} md={3}>
                    <Paper className={classes.paper} elevation={3}>
                        <h1>Artists</h1>
                        <hr />
                        {artists ? <InfoList array={artists} delete={deleteUser} listType="artist" groupId={id} loadArtists={loadArtists} /> : ""}
                        <br />
                        <div>
                            <Button className={classes.margin} label="artist" onClick={handleArtistOpen} variant="contained" color="primary">
                                Add Artist
                            </Button>
                            {artists.length > 0
                                ? <Button className={classes.margin} variant="contained" onClick={handleClick} color="primary">{deleteUser ? "Done" : "Remove Artist"}</Button>
                                : ""
                            }
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm={8} md={9}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Button className={classes.margin} onClick={handleOpen} variant="contained" color="primary">
                                Create Post +
                            </Button>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper} elevation={3}>
                                <h1>Today's Schedule</h1>
                                <hr />
                                {group.posts ? <InfoList status="ready" array={group.posts.filter(post => post.status === "ready")} /> : <h3>Nothing Scheduled Today</h3>}
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper} elevation={3}>
                                <h1>Drafts</h1>
                                <hr />
                                {group.posts ? <InfoList status="draft" array={group.posts.filter(post => post.status === "draft")} /> : <h3>No Drafts</h3>}
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper} elevation={3}>
                                <h1>Scheduled Later</h1>
                                <hr />
                                {group.posts ? <InfoList status="later" array={group.posts.filter(post => post.status === "later")} /> : <h3>Nothing Scheduled</h3>}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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
                    <div className={classes.modalPaper}>
                        <PostForm handleClose={handleClose} loadGroup={loadGroup} groupId={id} />
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={addArtistOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addArtistOpen}>
                    <div className={classes.modalPaper}>
                        <Search groupId={id} loadArtists={loadArtists} handleClose={handleClose} />
                    </div>
                </Fade>
            </Modal>
            {/* <FormModal open={addArtistOpen}/> */}

        </div>
    )
}

export default ManageGroup;