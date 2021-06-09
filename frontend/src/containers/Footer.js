import React from 'react';
import { Typography, Link, Box } from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.youtube.com/c/kenlovestocode/">
                kenLovesToCode
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box mt={2} mb={2}>
            <Copyright />
        </Box>
    )
}
