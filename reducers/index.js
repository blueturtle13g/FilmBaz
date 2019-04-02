import {
    FROM_FAV,
    FROM_SEEN,
    FROM_WISH,
    PORTRAIT,
    FAVORITE_SCREEN,
    WISH_LIST_SCREEN,
    ARTISTS_SCREEN,
    SEEN_SCREEN,
    TOP_SCREEN,
    TRENDING_SCREEN,
    TOGGLE_FROM,
    UPDATE_PROP
} from "../actions/types";

const INITIAL_STATE = {
    sections: [
        {
            name:"مورد علاقه",
            img: {uri: "https://images.unsplash.com/photo-1530432999454-016a47c78af3?ixlib=rb-1.2.1&q=80&fm=jpg" +
                "&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
            link: FAVORITE_SCREEN
        },
        {
            name:"در انتظار دیدن",
            img: {uri: "https://images.unsplash.com/photo-1501432377862-3d0432b87a14?ixlib=rb-1.2.1&q=80&fm=jpg" +
                "&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
            link: WISH_LIST_SCREEN
        },
        {
            name:"دیده شده",
            img: {uri: "https://images.unsplash.com/photo-1521985179118-6008b8cef2c2?ixlib=rb-1.2.1&" +
                "q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
            link: SEEN_SCREEN
        },
        {
            name:"برترین ها",
            img: {uri: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-1.2.1&q=80" +
                "&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
            link: TOP_SCREEN
        },
        {
            name:"ترند",
            img: {uri: "https://images.unsplash.com/photo-1536081905080-f14fb4d6e52d?ixlib=rb-1.2.1&q=80&fm=jpg" +
                "&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
            link: TRENDING_SCREEN
        },
        {
            name:"هنرمندان",
            img: {uri: "https://images.unsplash.com/photo-1553135648-d7cf7ab44ebc?ixlib=rb-1.2.1&q=80&fm=jpg" +
                "&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYzMjU3fQ"},
            link: ARTISTS_SCREEN
        },
    ],
    orientation: PORTRAIT,
    dynamic_title: "",
    search_txt: "",
    search_results: {},
    similar_results: [],
    seen_movies: [],
    fav_movies: [],
    wish_movies: [],
    seen_movies_ids: [],
    fav_movies_ids: [],
    wish_movies_ids: [],
    current_movie: {},
    current_person: {},
    network_err: null
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

        case TOGGLE_FROM:
            let { key, value } = action.payload;
            switch (key){
                case FROM_FAV:
                    if(state.fav_movies_ids.includes(value.id))
                    return {
                        ...state,
                        fav_movies_ids: state.fav_movies_ids.filter(e=> e!==value.id),
                        fav_movies: state.fav_movies.filter(e=> e.id!==value.id)
                    };
                    else
                    return {
                        ...state,
                        fav_movies_ids: [...state.fav_movies_ids, value.id],
                        fav_movies: [...state.fav_movies, value]
                    };
        case FROM_SEEN:
                    if(state.seen_movies_ids.includes(value.id))
                        return {
                            ...state,
                            seen_movies_ids: state.seen_movies_ids.filter(e=> e!==value.id),
                            seen_movies: state.seen_movies.filter(e=> e.id!==value.id)
                    };
                    else
                        return {
                            ...state,
                            seen_movies_ids: [...state.seen_movies_ids, value.id],
                            seen_movies: [...state.seen_movies, value]
                        };
                case FROM_WISH:
                    if(state.wish_movies_ids.includes(value.id))
                        return {
                            ...state,
                            wish_movies_ids: state.wish_movies_ids.filter(e=> e!==value.id),
                            wish_movies: state.wish_movies.filter(e=> e.id!==value.id)
                        };
                    else
                        return {
                            ...state,
                            wish_movies_ids: [...state.wish_movies_ids, value.id],
                            wish_movies: [...state.wish_movies, value]
                        };
                default:
                    return state
            }

        default: return state;
    }
}