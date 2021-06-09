import { endpoint } from "../constant";
import { STORE, GET, UPDATE, DELETE } from "./modelActionTypes";
import axios from 'axios';


export const getDatas = (uri, dataType) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${endpoint}/${uri}/`);
        dispatch({
            type: GET,
            dataType,
            payload: data
        })
    } catch (error) {
        console.log('Error Occured : ', error);
    }
}

export const insertData = (uri, dataType, payload) => async (dispatch) => {
    try {
        await axios.post(`${endpoint}/${uri}/`, payload);
        dispatch({
            type: STORE,
            dataType,
            payload
        })
    } catch (err) {
        console.log('Error occured : ', err)
    }
}

export const updateData = (uri, dataType, payload, id) => async (dispatch) => {
    try {
        await axios.put(`${endpoint}/${uri}/${id}/`, payload);
        dispatch({
            type: UPDATE,
            dataType,
            payload,
            id
        });
    } catch (err) {
        console.log(err)
    }
}

export const deleteRedux = (dataType, payload) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE,
            dataType,
            payload
        })
    } catch (err) {
        console.log('Error occured : ', err);
    }
}

export const deleteData = (uri, dataType, payload) => async (dispatch) => {
    try {
        await axios.delete(`${endpoint}/${uri}/${payload}/`);
        dispatch({
            type: DELETE,
            dataType,
            payload
        });
    } catch (err) {
        console.log('Error occured : ', err);
    }
}