import React, { useEffect } from 'react';
import { withAlert } from "react-alert";

function Alert(props) {
    useEffect(() => {
        props.alert.show('It works');
    }, []);
    return (
        <>

        </>
    )
}

export default withAlert(Alert);
