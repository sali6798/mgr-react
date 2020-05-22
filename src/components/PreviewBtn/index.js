import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Backdrop, Fade, Grid, TextField, GridList, GridListTile } from "@material-ui/core"
import FacebookButton from "../FacebookButton";
import TwitterButton from "../TwitterButton";
import API from "../../utils/API"

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
    const [fanPage, setFanPage] = useState([]);

    const handleInputChange = event => {
        setPostBody(event.target.value);
    }

    useEffect( async () => {
        const {data} = await API.getPagesinfo()
        console.log(data)
        setFanPage(data)        
    }, [])

    function twitter() {
        // post to twitter
        console.log("TW")
        console.log(postBody.body);
        API.twPostText(postBody)
        .then((res) => {
            console.log(res);
            console.log("tweet success")
        })
    }

    async function facebook() {
        // post to facebook
        console.log("FB")
        API.fbPostText(fanPage[0].id, fanPage[0].access_token, postBody)
        .then((res) => {
            console.log(res);
            console.log("fb posted");
        })

    }

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
                                <FacebookButton text="Post" handleClick={facebook}/>
                            </Grid>
                            <Grid item>
                                <TwitterButton text="Post" handleClick={twitter}/>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}