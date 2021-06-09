import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

import Restaurant from '../assets/img/restaurant.jpg';
import HomePage from "../containers/HomePage"
import Footer from '../containers/Footer'

const useStyles = makeStyles((theme) => ({
    imageContainer: {
        height: 800,
        backgroundImage: `url(${Restaurant})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
}))

export default function Home() {
    const classes = useStyles();
    return (
        <>
            <HomePage>
                <Paper className={classes.imageContainer}></Paper>
            </HomePage>
            <Footer />
        </>
    )
}
