import React, { Component } from 'react';
import {
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { toggleFrom } from '../../actions';
import {
    FROM_FAV,
    FROM_SEEN,
    FROM_WISH
} from '../../actions/types';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

class MovieOptions extends Component {
    render() {
        const {
            toggleFrom,
            store:{
                seen_movies_ids,
                fav_movies_ids,
                wish_movies_ids,
                current_movie:{
                    id,
                    title,
                    name,
                    poster_path,
                    media_type,
                    vote_count,
                    popularity,
                    vote_average,
                    first_air_date,
                    release_date,
                    original_language
                }
            }
        } = this.props;

        const value ={
                id,
                title,
                name,
                poster_path,
                media_type,
                vote_count,
                popularity,
                vote_average,
                first_air_date,
                release_date,
                original_language
        };
        const is_fav = fav_movies_ids.includes(id);
        const is_seen = seen_movies_ids.includes(id);
        const is_wish = wish_movies_ids.includes(id);
        return (
            <Animatable.View
                style={styles.options_con}
                animation="slideInDown"
                iterationCount={1}
            >

                <TouchableOpacity
                    style={styles.icon_con}
                    onPress={()=>{
                        toggleFrom({key: FROM_FAV, value});
                        if(!is_fav) ToastAndroid.show('به مورد علاقه ها افزوده شد.', ToastAndroid.SHORT);
                    }}
                >
                    <MaterialCommunityIcons
                        name={is_fav ? "heart" :  "heart-outline"}
                        color={is_fav ? "#cd574c" : "#ffffff"}
                        size={35}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.icon_con}
                    onPress={() => {
                        toggleFrom({key: FROM_WISH, value});
                        if (!is_wish) ToastAndroid.show('در انتظار دیدن افزوده شد.', ToastAndroid.SHORT);
                    }}
                >
                    <Entypo
                        name={is_wish ? "star" : "star-outlined"}
                        color={is_wish ? "#d6c529" : "#ffffff"}
                        size={35}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.icon_con}
                    onPress={()=>{
                        toggleFrom({key: FROM_SEEN, value});
                        if(!is_seen) ToastAndroid.show('به دیده شده ها افزوده شد.', ToastAndroid.SHORT);
                    }}
                >
                    <MaterialCommunityIcons
                        name={is_seen ? "eye-check" :  "eye-plus"}
                        color={is_seen ? "#3e82aa" : "#ffffff"}
                        size={35}
                    />
                </TouchableOpacity>

            </Animatable.View>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {toggleFrom}
)(MovieOptions);

const styles = StyleSheet.create({
    icon_con:{
        marginHorizontal: 10
    },
    options_con:{
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});
