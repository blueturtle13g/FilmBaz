import React, { Component } from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../actions';
import Item from "../components/item/Item";
import ShowMore from "../components/item/ShowMore";
import {
    FIRST_TUBE,
    CURRENT_MOVIE,
    TMDB_API_KEY,
    SECOND_TUBE,
    APPEND_MOVIE,
    TMDB_BASE_REQ,
    DYNAMIC_TITLE,
    SIMILAR_RESULTS,
    TRAILER_SCREEN
} from "../actions/types";
import SimilarResult from "../components/item/SimilarResult";

class MovieScreen extends Component {
    state = {
        is_handling: false,
        show_more: false
    };

    handleLink =async id=>{
        const { updateProp, store:{current_movie, network_err}} = this.props;
        if(this.state.is_handling || network_err) return;
        this.setState({is_handling: true});
        try {
            let results = await fetch(`${TMDB_BASE_REQ}/${current_movie.media_type}/${id}${TMDB_API_KEY}${APPEND_MOVIE}`);
            let results_json = await results.json();
            results_json.media_type = current_movie.media_type;
            try {
                let similar_results = await fetch(`${TMDB_BASE_REQ}/${current_movie.media_type}/${id}/similar${TMDB_API_KEY}`);
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
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { store:{ current_movie, similar_results }, navigation:{navigate} } = this.props;
        const { show_more } = this.state;
        return (
            <ScrollView style={styles.container}>
                <Item
                    item={current_movie}
                    watchTrailer={()=>navigate(TRAILER_SCREEN,{
                        uri: FIRST_TUBE+current_movie.videos.results[0].key+SECOND_TUBE
                    })}
                    show_more={show_more}
                />
                <ShowMore
                    show_more={show_more}
                    toggle={()=>this.setState({show_more: !show_more})}
                />
                <ScrollView
                    style={styles.similar_con}
                    horizontal
                >
                    {similar_results.map((item,i)=><SimilarResult
                            key={item.id.toString()}
                            item={item}
                            i={i}
                            handleLink={this.handleLink}
                        />
                    )}
                </ScrollView>
            </ScrollView>
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
)(MovieScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    similar_con:{
        marginTop: 2
    },
});
