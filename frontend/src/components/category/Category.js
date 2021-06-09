import React, { useEffect, useState } from 'react';
import { Button, Divider, Snackbar, Typography } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

import { getDatas, setSelectedData, setIsCreating, deleteRedux } from "../../store";
import { CATEGORIES } from "../../store/dataTypes";
import Sidebar from '../../containers/Sidebar';
import Footer from '../../containers/Footer';
import { MaterialTableIcons } from "../../containers/MaterialTableIcons";
import { endpoint } from "../../constant";

const useStyles = makeStyles((theme) => ({
    createButton: {
        margin: theme.spacing(2, 0, 4),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Category(props) {
    useEffect(() => {
        props.getCategories('api/v1/category', CATEGORIES);
    }, []);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    const handleButtonClick = (flag, payload) => {
        props.setCategory(payload);
        props.setCreating(flag);
        props.history.push('/restaurant/category/editor');
    }

    const handleDelete = (payload) => {
        axios.delete(`${endpoint}/api/v1/category/${payload}/`)
            .then(res => {
                console.log(res.data)
                if (res.data.message === 'error') {
                    setMessage('Category cannot be deleted. This item is referred to by another object.')
                    setSeverity('error');
                    setOpen(true);
                } else {
                    props.deleteCategory(CATEGORIES, payload)
                    setMessage('Category has been deleted.')
                    setSeverity('success');
                    setOpen(true);
                }
            });
    }

    return (
        <>
            <Sidebar>
                <Button
                    component={NavLink}
                    to='/restaurant/category/editor'
                    variant="outlined"
                    color="primary"
                    className={classes.createButton}
                    onClick={() => handleButtonClick(true, {})}
                >
                    Create new category
                </Button>
                <Divider />
                <MaterialTable
                    title="Categories"
                    columns={[
                        { title: 'Category Name', field: 'CategoryName' },
                        { title: 'Active Status', field: 'IsActive' },
                    ]}
                    data={props.categories}
                    options={{
                        search: true
                    }}
                    icons={MaterialTableIcons}
                    actions={[
                        {
                            icon: () => <EditIcon />,
                            tooltip: 'Edit category',
                            onClick: (event, rowData) => handleButtonClick(false, rowData)
                        },
                        {
                            icon: () => <DeleteIcon />,
                            tooltip: 'Delete category',
                            onClick: (event, rowData) => handleDelete(rowData.id)
                        }
                    ]}
                >

                </MaterialTable>
            </Sidebar>
            <Footer />
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    <Typography variant="h6">{message}</Typography>
                </Alert>
            </Snackbar>
        </>
    )
}

const mapStateToProps = storeData => ({
    categories: storeData.modelData[CATEGORIES],
})

const mapDispatchToProps = {
    getCategories: getDatas,
    setCategory: setSelectedData,
    setCreating: setIsCreating,
    deleteCategory: deleteRedux,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));