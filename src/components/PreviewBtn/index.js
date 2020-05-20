import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Backdrop, Fade, Grid, TextField, GridList, GridListTile } from "@material-ui/core"
import FacebookButton from "../FacebookButton";
import TwitterButton from "../TwitterButton";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
        width: "200px"
    },
    size: {
        width: "100%"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: "5px",
        width: "50%"
    },
    gridList: {
        flexWrap: 'nowrap',
        width: "100%",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    }
}));

export default function PreviewBtn(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [postBody, setPostBody] = useState(props.body)

    const handleInputChange = event => {
        setPostBody(event.target.value);
    }

    // function twitter() {
    //     // post to twitter
    //     console.log("TW")
    // }

    // function facebook() {
    //     // post to facebook
    //     console.log("FB")
    //     // API.fbPhotoPost(pgId, imgUrl,text, pgToken)
    //     //     .then(() => {
    //     //         console.log("Posted");
    //     //     })
    // }

    // const postHandle = (mediaType) => {
    //     if (mediaType === "Facebook") {
    //         facebook();
    //     } else twitter();
    // }

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Preview
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <h3>{props.eventTitle}</h3>
                            </Grid>

                            <GridList className={classes.gridList} cellHeight={160} cols={3}>
                                {props.imageLinks.map((tile, index) => (
                                    <GridListTile key={index}>
                                        <img src={tile} alt="image post" />

                                    </GridListTile>
                                ))}
                            </GridList>

                            <Grid item>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Post"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    name="post"
                                    value={postBody}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <FacebookButton text="Post" />
                            </Grid>
                            <Grid item>
                                <TwitterButton text="Post" />
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}