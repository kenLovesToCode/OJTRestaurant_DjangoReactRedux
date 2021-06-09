import { MENUS, CATEGORIES } from "./dataTypes";

export const initialData = {
    modelData: {
        [MENUS]: [{
            "id": 1,
            "MenuName": "Chicken Adobo",
            "MenuDescription": "Chicken stew in soy sauce and vinegar.",
            "MenuPrice": "195.00",
            "CategoryName": {
                "id": 1,
                "CategoryName": "Main Course",
                "IsActive": "Yes"
            },
            "IsActive": "Yes"
        },],
        [CATEGORIES]: [
            {
                "id": 1,
                "CategoryName": "Main Course",
                "IsActive": "Yes"
            },
        ]
    },
    stateData: {
        selectedData: {},
        isCreating: false,
    }
}