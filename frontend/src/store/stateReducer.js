import { initialData } from "./initialData";
import { STATE_SET_DATA, STATE_IS_CREATING, STATE_ERROR_MESSAGE } from "./stateActionTypes";

export default function (storeData, action) {
    switch (action.type) {
        case STATE_SET_DATA:
            return {
                ...storeData,
                selectedData: action.payload
            }
        case STATE_IS_CREATING:
            return {
                ...storeData,
                isCreating: action.payload
            }
        default:
            return storeData || initialData.stateData
    }
}