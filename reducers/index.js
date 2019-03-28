import {
    UPDATE_PROP
} from "../actions/types";
import {toPersian} from "../utils";

const INITIAL_STATE = {
    wish_list:[],
    saw_list:[],
    user_name:"رضا",
    user_img: "",
    network_err: "",
    is_permitted: false,
    sections: [
        "مورد علاقه",
        "در انتظار دیدن",
        "دیده شده",
        toPersian("250 فیلم برتر"),
        "جشنواره ها",
        "مقالات",
    ],
    search_txt: "",
    dynamic_title: "",
    search_results: [],
    current_movie: {},
    current_person: {},
    sections_img: [
        {uri: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?ixlib=rb-1.2.1&q=80&fm=jpg" +
            "&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
        {uri: "https://images.unsplash.com/photo-1490003695933-fc769c821a45?ixlib=rb-1.2.1&q=80&fm=jpg" +
            "&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
        {uri: "https://images.unsplash.com/photo-1517328115-05cdc8f8be45?ixlib=rb-1.2.1&q=80&fm=jpg&" +
            "crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
        {uri: "https://images.unsplash.com/photo-1494394114709-1b74150c2d47?ixlib=rb-1.2.1&q=80&fm=jpg" +
            "&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"}
    ],
    article_img: {uri: "https://images.unsplash.com/photo-1530669731069-48706bc794ab?ixlib=rb-1.2.1&q=80&" +
        "fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
    festival_img: {uri: "https://images.unsplash.com/profile-1504680088707-25c5019b41b5?ixlib=rb-1.2.1&q=80&" +
        "fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32"}
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case UPDATE_PROP:
            let newProps = {};
            // in case we want to update multiple properties at once
            if(Array.isArray(action.payload)){
                for(let prop of action.payload){
                    newProps = {...newProps, [prop.key]: prop.value}
                }
                return {...state, ...newProps}
            }

            return {...state, [action.payload.key]: action.payload.value};

        default: return state;
    }
}