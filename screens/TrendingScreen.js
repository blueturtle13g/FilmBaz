import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Pagination from '../components/pagination/Pagination';
import ResultItem from "../components/item/ResultItem";
import LinearGradient from 'react-native-linear-gradient';
import { TMDB_BASE_REQ } from "../actions/types";
import {connect} from "react-redux";
import MyOverlay from '../components/absolute/MyOverlay';

class TrendingScreen extends Component {
    state={
        trending: [],
        what_is_pressed: null
    };

    componentDidMount() {
        this.getTrending(1);
        const refresh_interval = setInterval(()=>{
            if(!this.state.trending.results) this.getTrending(1);
            else clearInterval(refresh_interval);
        }, 7000)
    }

    getTrending =async page=>{
        if(this.props.store.network_err) return;
        try {
            this.setState({what_is_pressed: page});
            let result = await fetch(
                `${TMDB_BASE_REQ}/trending/movie/day?api_key=0b408f411f8fbbfb304cee18b034e7b6&page=${page}`);
            let result_json = await result.json();
            this.setState({trending: result_json, what_is_pressed: null})
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { trending } = this.state;
        return (
            <LinearGradient
                colors={["#d3cce3","#e9e4f0"]}
                style={{flex: 1}}
            >
                {!trending.results &&<MyOverlay/>}
                <FlatList
                    data={trending.results}
                    keyExtractor={item=>item.id.toString()}
                    ListFooterComponent={()=>{
                        if(!!trending.results){
                            return(
                                <Pagination
                                    pages={(trending.total_pages > 1000) ? 1000 : trending.total_pages}
                                    page={trending.page}
                                    moveTo={this.getTrending}
                                    what_is_pressed={this.state.what_is_pressed}
                                />
                            )
                        }
                        return <View/>
                    }}
                    renderItem={(item)=><ResultItem
                        item={item}
                        navigate={this.props.navigation.navigate}
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
    mapStateToProps
)(TrendingScreen);