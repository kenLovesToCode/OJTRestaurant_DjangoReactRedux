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
import { MENUS, CATEGORIES } from "../../store/dataTypes";

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
    button: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MenuEditor(props) {
    useEffect(() => {
        props.getCategories('api/v1/category', CATEGORIES);
        props.getMenus('api/v1/menu', MENUS);
    }, []);
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            id: props.menu.id || '',
            MenuName: props.menu.MenuName || '',
            MenuDescription: props.menu.MenuDescription || '',
            MenuPrice: props.menu.MenuPrice || '',
            CategoryID: props.menu.CategoryID || '',
            IsActive: props.menu.IsActive || 'Yes',
        }
    );
    const [menuName, setMenuName] = useState(false);
    const [menuDesc, setMenuDesc] = useState(false);
    const [menuPrice, setMenuPrice] = useState(false);
    const [categoryID, setCategoryID] = useState(false);
    const [existed, setExisted] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    const handleSubmit = () => {
        userInput.MenuName === '' ? setMenuName(true) : setMenuName(false);
        userInput.MenuDescription === '' ? setMenuDesc(true) : setMenuDesc(false);
        userInput.MenuPrice === '' ? setMenuPrice(true) : setMenuPrice(false);
        userInput.CategoryID === '' ? setCategoryID(true) : setCategoryID(false);

        if (userInput.MenuName !== '' && userInput.MenuDescription !== '' && userInput.MenuPrice !== '' && userInput.CategoryID !== '') {
            if (userInput.id === "") { // create new
                var a = props.menus.find(m => m.MenuName === userInput.MenuName);
                if (typeof a == 'undefined') {
                    setExisted(false);
                    const ui = {
                        'MenuName': userInput.MenuName,
                        'MenuDescription': userInput.MenuDescription,
                        'MenuPrice': userInput.MenuPrice,
                        'CategoryID': userInput.CategoryID,
                        'IsActive': userInput.IsActive
                    }
                    props.insertMenu('api/v1/menu', MENUS, ui);
                    setMessage('New menu has been added.');
                    setOpen(true);
                    setTimeout(() => {
                        props.history.push('/restaurant/menu');
                    }, 1000);
                } else {
                    setExisted(true);
                }

            } else { // update
                if (userInput.MenuName === props.menu.MenuName && userInput.MenuDescription === props.menu.MenuDescription && props.menu.MenuPrice === userInput.MenuPrice && userInput.CategoryID === props.menu.CategoryID && props.menu.IsActive === userInput.IsActive) {
                    setTimeout(() => {
                        props.history.push('/restaurant/menu');
                    }, 1000);
                } else {
                    var b = props.menus.find(m => m.MenuName === userInput.MenuName);
                    if (typeof b == 'undefined' || props.menu.MenuName === userInput.MenuName) {
                        props.updateMenu('api/v1/menu', MENUS, userInput, props.menu.id)
                        setMessage('Menu has been updated.');
                        setOpen(true);
                        setTimeout(() => {
                            props.history.push('/restaurant/menu');
                        }, 1000);
                    } else {
                        setExisted(true);
                    }
                }
            }
        } else {
            alert('All fields are required. Please ensure all fields are completed.')
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
        props.history.push('/restaurant/menu')
    }
    return (
        <Container maxWidth='xs'>
            <div className={classes.paper}>
                <Typography variant="h4" align='center'>Create new menu</Typography>
                {existed ? <MuiAlert severity='error'>Menu already exists in the database.</MuiAlert> : null}
                <form className={classes.form} noValidate>
                    <TextField
                        error={menuName ? true : false}
                        helperText={menuName ? 'Required field' : ""}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Menu Name'
                        name='MenuName'
                        value={userInput.MenuName}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        error={menuDesc ? true : false}
                        helperText={menuDesc ? 'Required field' : ''}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Menu Description'
                        name='MenuDescription'
                        value={userInput.MenuDescription}
                        onChange={handleChange}
                    />
                    <TextField
                        error={menuPrice ? true : false}
                        helperText={menuPrice ? 'Required field' : ''}
                        variant='outlined'
                        margin='normal'
                        required
                        type='number'
                        fullWidth
                        label='Menu Price'
                        name='MenuPrice'
                        value={userInput.MenuPrice}
                        onChange={handleChange}
                    />
                    <Select
                        error={categoryID ? true : false}
                        helperText={categoryID ? 'Required field' : ''}
                        fullWidth
                        className={classes.select}
                        value={userInput.CategoryID}
                        name="CategoryID"
                        onChange={handleChange}
                    >
                        {props.categories.map(c => (
                            <MenuItem key={c.id} value={c.CategoryName}>
                                {c.CategoryName}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
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
    menu: storeData.stateData.selectedData,
    isCreating: storeData.stateData.isCreating,
    categories: storeData.modelData[CATEGORIES],
    menus: storeData.modelData[MENUS],
});

const mapDispatchToProps = {
    insertMenu: insertData,
    updateMenu: updateData,
    getCategories: getDatas,
    getMenus: getDatas,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuEditor));