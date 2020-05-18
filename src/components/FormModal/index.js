import React from "react";
import { Fade, Modal, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    }
}));

function FormModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    
    console.log(props.open)
    React.useEffect(() => {
        setOpen(props.open)
    }, [open])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // setTitle("");
        // setDescription("");
        // setChosenDate({
        //     allDay: false,
        //     startDate: new Date(),
        //     endDate: new Date()
        // });
    };

    return (
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
                    <h1>Hi</h1>
                </div>
            </Fade>
        </Modal>
    );
}

export default FormModal;