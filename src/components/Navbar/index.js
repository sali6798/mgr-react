import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.css"
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, AppBar } from "@material-ui/core"
import API from "../../utils/API"
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import LinkTab from '@material-ui/core/Tab';
// import Tab from '@material-ui/core/Tabs';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        textAlign: 'center',
    }
}));

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
    const location = useLocation();
    const classes = useStyles();
    const [value, setValue] = useState(0);
    // const location = useLocation();
    let isManager;

    useEffect(() => {
        API.readSessions()
            .then(({ data }) => {
                isManager = data.isManager;
                console.log(isManager)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // console.log(location.pathname)
        switch (location.pathname) {
            case "/dashboard":
                setValue(1);
                break;
            case "/groups":
                setValue(2);
                break;
            case "/createaccount":
                setValue(3);
                break;
            case "/login":
                setValue(4);
                break;
            case "/logout":
                API.logout()
                    .catch(err => console.log(err))
                break;
            default:
                setValue(0);
                break;
        }
    }, [location])

    function LinkTab(props) {
        return (
            <Tab
                component="a"
                {...props}
            />
        );
    }

    // function displayTabs() {
    //     if (isManager === true) {
    //         return (
    //             <div>
    //                 <LinkTab label="Home" href="/" />
    //                 <LinkTab label="Dashboard" href="/dashboard" />
    //                 <LinkTab label="Groups" href="/groups" />
    //                 <LinkTab label="Logout" href="/logout" />
    //             </div>
    //         );
    //     }
    //     else if (isManager === false) {
    //         return (
    //             <div>
    //                 <LinkTab label="Home" href="/" />
    //                 <LinkTab label="Dashboard" href="/dashboard" />
    //                 <LinkTab label="Logout" href="/logout" />
    //             </div>
    //         );
    //     }

    //     return (
    //         <div>
    //             <LinkTab label="Home" href="/" />
    //             <LinkTab label="Create Account" href="/createaccount" />
    //             <LinkTab label="Login" href="/login" />
    //         </div>
    //     );

    // }



    return (
        <div className={classes.root}>
            <AppBar position="static">
                <h1 className={classes.title}>MGR</h1>
                <Tabs
                    variant="fullwidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    centered
                >
                    {/* {displayTabs()} */}
                    <LinkTab label="Home" href="/" />
                    <LinkTab label="Dashboard" href="/dashboard" />
                    <LinkTab label="Groups" href="/groups" />
                    <LinkTab label="Create Account" href="/createaccount" />
                    <LinkTab label="Login" href="/login" />
                    <LinkTab label="Logout" href="/logout" />
                </Tabs>
            </AppBar>
        </div>
        // <Paper className={classes.root}>
        //     <h1 className={classes.title}>MGR</h1>
        //     <Tabs
        //         value={value}
        //         variant="fullWidth"
        //         onChange={handleChange}
        //         indicatorColor="primary"

        //         centered
        //     >
        //         <LinkTab label="Home" href="/" />
        //         <LinkTab label="Dashboard" href="/dashboard" />
        //         <LinkTab label="Groups" href="/groups" />
        //         <LinkTab label="Create Account" href="/createaccount" />
        //         <LinkTab label="Login" href="/login" />
        //     </Tabs>
        // </Paper>
    );
}

export default Navbar;