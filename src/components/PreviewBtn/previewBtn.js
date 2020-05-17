import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
        width: "200px"
    },
    size: {
        width: "100%"
    }
}));

export default function SimplePopover(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function twitter() {
        // post to twitter
        console.log("TW")
    }

    function facebook() {
        // post to facebook
        console.log("FB")
        // API.fbPhotoPost(pgId, imgUrl,text, pgToken)
        //     .then(() => {
        //         console.log("Posted");
        //     })
    }

    const postHandle = (mediaType) => {   
        if (mediaType === "Facebook") {
            facebook();
        } else twitter();
    }

    return (
        <div>
            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Preview
      </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <span>{props.mediaName}</span>
                    <img src={props.img} alt="contentPicture" className={classes.size} />
                    <span>{props.content}</span><br/>
                    <button onClick={()=> postHandle(props.mediaName)}>Approve</button>
                </Typography>
            </Popover>
        </div>
    );
}