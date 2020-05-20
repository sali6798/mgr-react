import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "./style.css"
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, AppBar, Box, Typography } from "@material-ui/core"
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

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//           role="tabpanel"
//           hidden={value !== index}
//           id={`simple-tabpanel-${index}`}
//           aria-labelledby={`simple-tab-${index}`}
//           {...other}
//         >
//           {value === index && (
//             <Box p={3}>
//               <Typography>{children}</Typography>
//             </Box>
//           )}
//         </div>
//       );
//     }

//     function a11yProps(index) {
//         return {
//             id: `simple-tab-${index}`,
//             'aria-controls': `simple-tabpanel-${index}`,
//         };
//     }

function Navbar() {
    const location = useLocation();
    const classes = useStyles();
    const [value, setValue] = useState();
    // const location = useLocation();
    let isManager = useRef(null);

    // useEffect(() => {
    //     // console.log(location.pathname)
    //     switch (location.pathname) {
    //         case "/dashboard":
    //             setValue(1);
    //             break;
    //         case "/groups":
    //             setValue(2);
    //             break;
    //         case "/createaccount":
    //             setValue(3);
    //             break;
    //         case "/login":
    //             setValue(4);
    //             break;
    //         case "/myaccount":
    //             setValue(5);
    //             break;
    //         case "/logout":
    //             API.logout()
    //                 .catch(err => console.log(err))
    //             break;
    //         case "/":
    //             setValue(0);
    //             break;
    //         default:
    //             break;
    //     }
    // }, [location])

    useEffect(() => {
        API.readSessions()
            .then(({ data }) => {
                isManager.current = data.isManager;
                console.log(isManager)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = (event, newValue) => {
        // event.preventDefault()
        setValue(newValue);
    };

   



    // function LinkTab(props) {
    //     return (
    //         <Tab
    //             component="a"
    //             {...props}
    //         />
    //     );
    // }

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


    if (isManager --- true) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <h1 className={classes.title}>MGR</h1>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        centered
                    >
                        {/* {displayTabs()} */}
                        <Tab label="Dashboard" component={Link} to="/dashboard"/>
                        <Tab label="Groups" component={Link} to="/groups"/>
                        <Tab label="My Account" component={Link} to="/myaccount"/>
                        <Tab label="Logout" component={Link} to="/login"/>
                    </Tabs>
                </AppBar>
    
    
            </div>
    
        );
    } else if (isManager === false) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <h1 className={classes.title}>MGR</h1>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        centered
                    >
                        {/* {displayTabs()} */}
                        <Tab label="Dashboard" component={Link} to="/dashboard"/>
                        <Tab label="My Account" component={Link} to="/myaccount"/>
                        <Tab label="Logout" component={Link} to="/login"/>
                    </Tabs>
                </AppBar>
    
    
            </div>
    
        );
    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <h1 className={classes.title}>MGR</h1>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        centered
                    >
                        {/* {displayTabs()} */}
                        <Tab label="Home" component={Link} to="/"/>
                        <Tab label="Create Account" component={Link} to="/createaccount"/>
                        <Tab label="Login" component={Link} to="/login"/>
                    </Tabs>
                </AppBar>
    
    
            </div>
    
        );
    }




    // return (
    //     <div className={classes.root}>
    //         <AppBar position="static">
    //             <h1 className={classes.title}>MGR</h1>
    //             <Tabs
    //                 variant="fullWidth"
    //                 value={value}
    //                 onChange={handleChange}
    //                 aria-label="simple tabs example"
    //                 centered
    //             >
    //                 {/* {displayTabs()} */}
    //                 <Tab label="Home" component={Link} to="/"/>
    //                 <Tab label="Dashboard" component={Link} to="/dashboard"/>
    //                 <Tab label="Groups" component={Link} to="/groups"/>
    //                 <Tab label="Create Account" component={Link} to="/createaccount"/>
    //                 <Tab label="Login" component={Link} to="/login"/>
    //                 <Tab label="My Account" component={Link} to="/myaccount"/>
    //                 <Tab label="Logout" component={Link} to="/login"/>
    //             </Tabs>
    //         </AppBar>


    //     </div>

    // );
}

export default Navbar;