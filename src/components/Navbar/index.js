import React, { useState, useEffect } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
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
        background: '#ffffff',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Orbitron',
        fontWeight: 700,
    },
    tab: {
        fontFamily: "Orbitron",
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
    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = useState();
    const [manager, setManager] = useState(false);

    useEffect(() => {
        // console.log(location.pathname)
        if (location.pathname === "/logout") {
            API.logout()
                .then(() => { 
                    setManager(undefined);
                    history.push("/");
                })
                .catch(err => console.log(err))
        }

        if (location.pathname === "/dashboard") {
            API.readSessions()
            .then(({ data }) => {
                console.log(data)
                setManager(data.isManager)
                console.log(data.isManager)
            })
            .catch(err => console.log(err))
        }
    }, [location])

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


    if (manager === true) {
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
                        <Tab className="tab" label="Dashboard" component={Link} to="/dashboard" />
                        <Tab className="tab" label="Groups" component={Link} to="/groups" />
                        <Tab className="tab" label="My Account" component={Link} to="/myaccount" />
                        <Tab className="tab" label="Logout" component={Link} to="/logout" />
                    </Tabs>
                </AppBar>


            </div>

        );
    } else if (manager === false) {
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
                        <Tab className="tab" label="Dashboard" component={Link} to="/dashboard" />
                        <Tab className="tab" label="My Account" component={Link} to="/myaccount" />
                        <Tab className="tab" label="Logout" component={Link} to="/logout" />
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
                        <Tab className="tab" label="Home" component={Link} to="/" />
                        <Tab className="tab" label="Create Account" component={Link} to="/createaccount" />
                        <Tab className="tab" label="Login" component={Link} to="/login" />
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