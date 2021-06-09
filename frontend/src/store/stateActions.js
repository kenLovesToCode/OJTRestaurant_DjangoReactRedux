import { STATE_SET_DATA, STATE_IS_CREATING } from "./stateActionTypes";

export const setSelectedData = payload => ({
    type: STATE_SET_DATA,
    payload
});

export const setIsCreating = payload => ({
    type: STATE_IS_CREATING,
    payload
});

