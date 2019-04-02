import {TOGGLE_FROM, UPDATE_PROP} from "./types";

export const updateProp = payload=>{
    // update a property with key value
    return{
        type: UPDATE_PROP,
        payload
    }
};

export const toggleFrom = payload=>{
    // update a property with key value
    return{
        type: TOGGLE_FROM,
        payload
    }
};