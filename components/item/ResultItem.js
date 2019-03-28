import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    NetInfo,
    ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../../actions';
import {
    TMDB_BASE_REQ,
    TMDB_API_KEY,
    APPEND_MOVIE,
    CURRENT_MOVIE,
    CURRENT_PERSON,
    MOVIE_SCREEN,
    PERSON_SCREEN,
    DYNAMIC_TITLE
} from '../../actions/types';
import {correct_date, toPersian} from "../../utils";
import KeyVal from './/KeyVal';
import KnownFor from './/KnownFor';
import ImgSection from './ImgSection';

class ResultItem extends Component {
    state={
        is_handling: false
    };

    handleLink =(id, media_type)=>{
        if(this.state.is_handling) return;
        this.setState({is_handling: true});
        const { updateProp, store:{}, navigation} = this.props;
        NetInfo.isConnected.fetch().then(async isConnected=> {
            if(isConnected){
                console.log(`${TMDB_BASE_REQ}/${media_type}/${id}${TMDB_API_KEY}${(media_type !== "person") ? APPEND_MOVIE : ""}`);
                try {
                    let results = await fetch(`${TMDB_BASE_REQ}/${media_type}/${id}${TMDB_API_KEY}${(media_type !== "person") ? APPEND_MOVIE : ""}`);
                    let results_json = await results.json();
                    console.log("results_json: ", results_json);
                    if(media_type !== "person"){
                        updateProp([
                            {key: CURRENT_MOVIE, value: results_json},
                            {key: DYNAMIC_TITLE, value: results_json.title || results_json.name},
                        ]);
                        navigation.navigate(MOVIE_SCREEN)
                    }else{
                        updateProp([
                            {key: CURRENT_PERSON, value: results_json},
                            {key: DYNAMIC_TITLE, value: results_json.title || results_json.name},
                        ]);
                        navigation.navigate(PERSON_SCREEN)
                    }

                    this.setState({is_handling: false});
                } catch (error) {
                    console.error(error);
                }
            }
            else ToastAndroid.show('لطفا اینترنت و فیلترشکن خود را روشن کنید..', ToastAndroid.SHORT);
        });
    };

    render() {
        const { updateProp, store:{}, item, index, results_length } = this.props;
        const is_movie = item.media_type !== "person";
        return (
            <View style={[styles.item, (index+1 === results_length) && {marginBottom: 43}]}>
                <ImgSection
                    onPress={()=>this.handleLink(item.id, item.media_type)}
                    img_path={is_movie ? item.poster_path : item.profile_path}
                />

                <View style={styles.details}>

                    <KeyVal
                        keyy={"نام"}
                        val={item.name || item.title}
                        onPress={()=>this.handleLink(item.id, item.media_type)}
                    />
                    <KeyVal  keyy={"محبوبیت"} val={item.popularity}/>

                    {is_movie
                        ?
                        <View>
                            <KeyVal keyy={"نوع"} val={item.media_type === "tv" ? " سریال" : " سینمایی"}/>
                            <KeyVal keyy={"تعداد رای"} val={toPersian(item.vote_count)}/>
                            <KeyVal keyy={"امتیاز"} val={toPersian(item.vote_average)}/>
                            <KeyVal keyy={"تاریخ انتشار"} val={toPersian(correct_date(item.first_air_date || item.release_date))}/>
                            <KeyVal keyy={"زبان"} val={toPersian(item.original_language)}/>
                        </View>
                        :
                        <KnownFor
                            keyy={"اثر برجسته"}
                            val={item.known_for}
                            onPress={id=>this.handleLink(id, "movie")}
                        />
                    }

                </View>
            </View>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateProp}
)(ResultItem);

const styles = StyleSheet.create({
    item:{
        width: "99%",
        height: 300,
        alignSelf: "center",
        backgroundColor: "#2b2b2b",
        margin: 2,
        overflow: "hidden",
        elevation: 5,
        flexDirection: "row",
    },
    details:{
        width: "55%",
        padding: 4
    }
});
