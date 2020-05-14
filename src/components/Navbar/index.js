import React from "react";
// import { Link, useLocation } from "react-router-dom";
import "./style.css"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import LinkTab from '@material-ui/core/Tab';
import Tab from '@material-ui/core/Tabs';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        textAlign: 'center',
    }
});

// function LinkTab(props) {
//     return (
//       <Tab
//         component="a"
//         onClick={(event) => {
//           event.preventDefault();
//         }}
//         {...props}
//       />
//     );
//   }

function Navbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    // const location = useLocation();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


      
      

    return (
        <Paper className={classes.root}>
            <h1 className={classes.title}>MGR</h1>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <LinkTab label="Home" href="/" />
                <LinkTab label="Dashboard" href="/dashboard" />
                <LinkTab label="Groups" href="/groups" />
                <LinkTab label="Create Account" href="/createaccount" />
                <LinkTab label="Login" href="/login" />
            </Tabs>
        </Paper>
    );
}

export default Navbar;