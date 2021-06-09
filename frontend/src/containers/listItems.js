import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Category, RestaurantMenu } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={NavLink} to="/restaurant/menu">
            <ListItemIcon>
                <RestaurantMenu />
            </ListItemIcon>
            <ListItemText primary="Menu" />
        </ListItem>
        <ListItem button component={NavLink} to="/restaurant/category">
            <ListItemIcon>
                <Category />
            </ListItemIcon>
            <ListItemText primary="Category" />
        </ListItem>
    </div>
)