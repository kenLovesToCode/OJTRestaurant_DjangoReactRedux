import { STORE, GET, UPDATE, DELETE } from "./modelActionTypes";
import { initialData } from "./initialData";

export default function (storeData, action) {
    switch (action.type) {
        case GET:
            return {
                ...storeData,
                [action.dataType]: action.payload,
            };
        case STORE:
            return {
                ...storeData,
                [action.dataType]: storeData[action.dataType].concat([action.payload]),
            };
        case UPDATE:
            return {
                ...storeData,
                [action.dataType]: storeData[action.dataType].map(d => d.id === action.id ? action.payload : d)
            }
        case DELETE:
            return {
                ...storeData,
                [action.dataType]: storeData[action.dataType].filter(d => d.id !== action.payload)
            }
        default:
            return storeData || initialData.modelData;
    }
}