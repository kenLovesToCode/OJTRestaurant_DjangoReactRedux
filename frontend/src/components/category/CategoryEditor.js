import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { insertData, updateData, getDatas } from "../../store";
import { CATEGORIES } from "../../store/dataTypes";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    select: {
        margin: theme.spacing(4, 0, 4),
    },
    formControl: {
        margin: theme.spacing(2, 0, 3),
        minWidth: 390,
    },
    button: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    title: {
        margin: theme.spacing(4, 0, 4)
    }
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function CategoryEditor(props) {
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            id: props.category.id || "",
            CategoryName: props.category.CategoryName || '',
            IsActive: props.category.IsActive || '',
        }
    );
    useEffect(() => {
        props.getCategories('api/v1/category', CATEGORIES);
    }, []);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const [required, setRequired] = useState(false);
    const [existed, setExisted] = useState(false);
    const [message, setMessage] = useState('');
    const [isActive, setIsActive] = useState(false);

    const classes = useStyles();

    const handleSubmit = () => {
        userInput.IsActive === '' ? setIsActive(true) : setIsActive(false);
        userInput.CategoryName === '' ? setRequired(true) : setRequired(false);
        if (userInput.CategoryName !== '' && userInput.IsActive !== '') {
            var a = props.categories.find(c => c.CategoryName === userInput.CategoryName && c.IsActive === userInput.IsActive);
            if (userInput.id === "") { // create new
                if (typeof a == 'undefined') {
                    setExisted(false);
                    setMessage('New menu category has been added.')
                    setOpen(true);
                    props.insertCategory('api/v1/category', CATEGORIES, userInput);
                    setTimeout(() => {
                        props.history.push('/restaurant/category');
                    }, 1000);
                } else {
                    setExisted(true);
                }
            } else { // update
                if (props.category.CategoryName === userInput.CategoryName && props.category.IsActive === userInput.IsActive) {
                    setTimeout(() => {
                        props.history.push('/restaurant/category');
                    }, 1000);
                } else if (typeof a == 'undefined' || props.category.CategoryName === userInput.CategoryName) {
                    setExisted(false);
                    setMessage('Category has been updated.');
                    setOpen(true);
                    props.updateCategory('api/v1/category', CATEGORIES, userInput, props.category.id)
                    setTimeout(() => {
                        props.history.push('/restaurant/category');
                    }, 1000);
                } else {
                    setExisted(true);
                }
            }
        } else {
            alert('All fields are required. Please ensure that all fields are completed.');
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setUserInput({
            [name]: newValue,
        })
    }

    const handleCancel = () => {
        props.history.push('/restaurant/category')
    }
    return (
        <Container maxWidth='xs'>
            <div className={classes.paper}>
                <Typography className={classes.title} variant="h4" align='center'>Create new category</Typography>
                {existed ? <MuiAlert severity='error'>Category name already exists in the database.</MuiAlert> : null}
                <form className={classes.form} noValidate>
                    <TextField
                        error={required}
                        helperText={required ? 'Required field' : ''}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Category Name'
                        name='CategoryName'
                        value={userInput.CategoryName}
                        onChange={handleChange}
                        autoFocus
                    />
                    <Select
                        error={isActive}
                        fullWidth
                        className={classes.select}
                        value={userInput.IsActive}
                        name='IsActive'
                        onChange={handleChange}
                    >
                        {
                            ['Yes', 'No'].map(x => (
                                <MenuItem key={x} value={x}>
                                    {x}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        {props.isCreating ?
                            'Save New' :
                            'Update'
                        }
                    </Button>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                    >
                        Cancel
					</Button>
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    <Typography variant="h6">{message}</Typography>
                </Alert>
            </Snackbar>
        </Container>
    )
}

const mapStateToProps = storeData => ({
    category: storeData.stateData.selectedData,
    categories: storeData.modelData[CATEGORIES],
    isCreating: storeData.stateData.isCreating,
});

const mapDispatchToProps = {
    insertCategory: insertData,
    updateCategory: updateData,
    getCategories: getDatas
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryEditor));