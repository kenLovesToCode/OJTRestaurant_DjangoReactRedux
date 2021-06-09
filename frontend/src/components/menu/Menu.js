import React, { useEffect, useState } from 'react';
import { Button, Divider, Snackbar, Typography } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getDatas, setSelectedData, setIsCreating, deleteData } from "../../store";
import { MENUS } from "../../store/dataTypes";
import Sidebar from '../../containers/Sidebar';
import Footer from '../../containers/Footer';
import { MaterialTableIcons } from "../../containers/MaterialTableIcons";

const useStyles = makeStyles((theme) => ({
    createButton: {
        margin: theme.spacing(2, 0, 4),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Menu(props) {

    useEffect(() => {
        props.getMenus('api/v1/menu', MENUS);
    }, []);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleButtonClick = (flag, payload) => {
        props.setMenu(payload);
        props.setCreating(flag);
        props.history.push('/restaurant/menu/editor');
    }

    const handleDelete = (payload) => {
        props.deleteMenu('api/v1/menu', MENUS, payload);
        setOpen(true);
    }

    return (
        <>
            <Sidebar>
                <Button
                    component={NavLink}
                    to='/restaurant/menu/editor'
                    variant="outlined"
                    color="primary"
                    className={classes.createButton}
                    onClick={() => handleButtonClick(true, {})}
                >
                    Create new menu
                </Button>
                <Divider />
                <MaterialTable
                    title="Menus"
                    icons={MaterialTableIcons}
                    columns={[
                        { title: 'Menu Name', field: 'MenuName' },
                        { title: 'Menu Description', field: 'MenuDescription' },
                        { title: 'Price', field: 'MenuPrice' },
                        { title: 'Category', field: 'CategoryID' },
                        { title: 'Active Status', field: 'IsActive' },
                    ]}
                    data={props.menus}
                    options={{
                        search: true
                    }}
                    actions={[
                        {
                            icon: () => <EditIcon />,
                            tooltip: 'Edit menu',
                            onClick: (event, rowData) => handleButtonClick(false, rowData)
                        },
                        {
                            icon: () => <DeleteIcon />,
                            tooltip: 'Delete menu',
                            onClick: (event, rowData) => handleDelete(rowData.id)
                        }
                    ]}
                />
            </Sidebar>
            <Footer />
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    <Typography variant="h5">{`Menu has been deleted.`}</Typography>
                </Alert>
            </Snackbar>
        </>
    )
}

const mapStateToProps = storeData => ({
    menus: storeData.modelData[MENUS],
});

const mapDispatchToProps = {
    getMenus: getDatas,
    setMenu: setSelectedData,
    setCreating: setIsCreating,
    deleteMenu: deleteData,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));