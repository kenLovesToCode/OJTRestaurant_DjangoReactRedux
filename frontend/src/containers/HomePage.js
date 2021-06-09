import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { HomeRounded, Fastfood } from "@material-ui/icons";
import { NavLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    centerSpace: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    }
}))

function HomePage(props) {
    const classes = useStyles();
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Button component={NavLink} color="inherit" to="/" variant="h6">
                        Art Cafe Restaurant
                    </Button>
                    <div className={classes.centerSpace}></div>
                    <div>
                        <Button
                            component={NavLink}
                            to="/"
                            className={classes.button}
                            color="inherit"
                            startIcon={<HomeRounded />}
                        >
                            Home
                        </Button>
                        <Button
                            component={NavLink}
                            to="/restaurant/menu"
                            className={classes.button}
                            color="inherit"
                            startIcon={<Fastfood />}
                        >
                            Restaurant
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {props.children}
        </>
    )
}

export default HomePage;
