import React, { Component } from 'react';
import {
    View,
    StyleSheet
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
    DYNAMIC_TITLE,
    SIMILAR_RESULTS
} from '../../actions/types';
import {correct_date, toPersian} from "../../utils";
import KeyVal from './KeyVal';
import KnownFor from './KnownFor';
import ImgSection from './ImgSection';

class ResultItem extends Component {
    state={
        is_handling: false
    };

    handleLink =async (id, media_type)=>{
        const { updateProp, navigate, store:{network_err}} = this.props;
        if(this.state.is_handling || network_err) return;
        this.setState({is_handling: true});
        try {
            let results = await fetch(`${TMDB_BASE_REQ}/${media_type}/${id}${TMDB_API_KEY}${(media_type !== "person") ? APPEND_MOVIE : ""}`);
            let results_json = await results.json();
            results_json.media_type = media_type;
            if(media_type !== "person"){
                try {
                    let similar_results = await fetch(`${TMDB_BASE_REQ}/${media_type}/${id}/similar${TMDB_API_KEY}`);
                    let similar_results_json = await similar_results.json();
                    updateProp([
                        {key: CURRENT_MOVIE, value: results_json},
                        {key: DYNAMIC_TITLE, value: results_json.title || results_json.name},
                        {key: SIMILAR_RESULTS, value: similar_results_json.results.slice(0, 10)}
                    ]);
                    this.setState({is_handling: false});
                } catch (error) {
                    console.error(error);
                }
                navigate(MOVIE_SCREEN)
            }else{
                updateProp([
                    {key: CURRENT_PERSON, value: results_json},
                    {key: DYNAMIC_TITLE, value: results_json.title || results_json.name},
                ]);
                this.setState({is_handling: false});
                navigate(PERSON_SCREEN)
            }
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const {
            item:{
                item:{
                    title,
                    name,
                    id,
                    media_type = "movie",
                    poster_path,
                    profile_path,
                    popularity,
                    vote_count,
                    vote_average,
                    first_air_date,
                    release_date,
                    known_for,
                    original_language
                },
                index
            },
        } = this.props;
        const is_movie = media_type !== "person";
        return (
            <View style={[styles.item,(index === 0) && {marginTop: 4}]}>
                <ImgSection
                    onPress={()=>this.handleLink(id, media_type)}
                    img_path={is_movie ? poster_path : profile_path}
                />

                <View style={styles.details}>

                    <KeyVal
                        keyy={"نام"}
                        val={name || title}
                        onPress={()=>this.handleLink(id, media_type)}
                    />
                    <KeyVal  keyy={"محبوبیت"} val={toPersian(popularity)}/>

                    {is_movie
                        ?
                        <View>
                            <KeyVal keyy={"نوع"} val={media_type}/>
                            <KeyVal keyy={"تعداد رای"} val={toPersian(vote_count)}/>
                            <KeyVal keyy={"امتیاز"} val={toPersian(vote_average)}/>
                            <KeyVal keyy={"تاریخ انتشار"} val={toPersian(correct_date(first_air_date || release_date))}/>
                            <KeyVal keyy={"زبان"} val={toPersian(original_language)}/>
                        </View>
                        :
                        <KnownFor
                            keyy={"اثر برجسته"}
                            val={known_for}
                            onPress={this.handleLink}
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
    },
    loading:{
        position: "absolute",
        top: 110
    },
});
