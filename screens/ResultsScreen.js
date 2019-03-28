import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList, NetInfo,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Pagination from '../components/pagination/Pagination';
import { updateProp } from '../actions';
import ResultItem from "../components/item/ResultItem";
import {
    RESULTS_SCREEN,
    SEARCH_RESULTS,
    TMDB_BASE_REQ,
    TMDB_API_KEY
} from "../actions/types";

class ResultsScreen extends Component {
    state= {
        what_is_pressed: null
    };

    moveTo = page=>{
        const { updateProp, store:{ search_txt }, navigation } = this.props;
        NetInfo.isConnected.fetch().then(async isConnected=> {
            if(isConnected){
                this.setState({what_is_pressed: page});
                console.log(`${TMDB_BASE_REQ}/search/multi${TMDB_API_KEY}&query=${search_txt}&page=${page}`);
                try {
                    let results = await fetch(
                        `${TMDB_BASE_REQ}/search/multi${TMDB_API_KEY}&query=${search_txt}&page=${page}`
                    );
                    let results_json = await results.json();
                    console.log("results_json: ", results_json);
                    updateProp({
                        key: SEARCH_RESULTS,
                        value: results_json
                    });
                    this.setState({what_is_pressed: null});
                } catch (error) {
                    console.error(error);
                }
            }
            else ToastAndroid.show('لطفا اینترنت و فیلترشکن خود را روشن کنید..', ToastAndroid.SHORT);
        });
    };

    render() {
        const { updateProp, store:{ search_results }, navigation } = this.props;
        // console.log("search_results.results: ", search_results.results);
        return (
            <View style={styles.container}>
                <FlatList
                    data={search_results.results}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={(item)=><ResultItem
                        item={item.item}
                        index={item.index}
                        results_length={search_results.results.length}
                        navigation={navigation}
                    />}
                />
                <Pagination
                    pages={(search_results.total_pages > 1000) ? 1000 : search_results.total_pages}
                    page={search_results.page}
                    moveTo={this.moveTo}
                    what_is_pressed={this.state.what_is_pressed}
                />
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
)(ResultsScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
});
