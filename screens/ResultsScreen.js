import React, { Component } from 'react';
import {StyleSheet, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from "../actions";
import Pagination from '../components/pagination/Pagination';
import ResultItem from "../components/item/ResultItem";
import LinearGradient from 'react-native-linear-gradient';

import {
    SEARCH_RESULTS,
    TMDB_BASE_REQ,
    TMDB_API_KEY
} from "../actions/types";

class ResultsScreen extends Component {
    state= {
        what_is_pressed: null
    };

    moveTo = async page=>{
        const { updateProp, store:{ search_txt, network_err } } = this.props;
        if(network_err) return;
        this.setState({what_is_pressed: page});
        try {
            let results = await fetch(
                `${TMDB_BASE_REQ}/search/multi${TMDB_API_KEY}&query=${search_txt}&page=${page}`
            );
            let results_json = await results.json();
            updateProp({
                key: SEARCH_RESULTS,
                value: results_json
            });
            this.setState({what_is_pressed: null});
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { store:{ search_results }, navigation:{navigate} } = this.props;
        return (
            <LinearGradient
                colors={["#d3cce3","#e9e4f0"]}
                style={styles.container}
            >
                <FlatList
                    data={search_results.results}
                    keyExtractor={item=>item.id.toString()}
                    ListFooterComponent={()=><Pagination
                        pages={(search_results.total_pages > 1000) ? 1000 : search_results.total_pages}
                        page={search_results.page}
                        moveTo={this.moveTo}
                        what_is_pressed={this.state.what_is_pressed}
                    />}
                    renderItem={(item)=><ResultItem
                        item={item}
                        navigate={navigate}
                    />}
                />
            </LinearGradient>
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
)(ResultsScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
});
