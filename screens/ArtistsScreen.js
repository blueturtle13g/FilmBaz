import React, { Component } from 'react';
import {FlatList, View} from 'react-native';
import Pagination from '../components/pagination/Pagination';
import ResultItem from "../components/item/ResultItem";
import LinearGradient from 'react-native-linear-gradient';
import {TMDB_BASE_REQ} from "../actions/types";
import { connect } from 'react-redux';
import MyOverlay from '../components/absolute/MyOverlay';

class ArtistsScreen extends Component {
    state={
        artists: [],
        what_is_pressed: null
    };

    componentDidMount() {
        this.getPersons(1);
        const refresh_interval = setInterval(()=>{
            if(!this.state.artists.results) this.getPersons(1);
            else clearInterval(refresh_interval);
        }, 7000)
    }

    getPersons = async page=>{
        if(this.props.store.network_err) return;
        try {
            this.setState({what_is_pressed: page});
            let result = await fetch(
                `${TMDB_BASE_REQ}/trending/person/day?api_key=0b408f411f8fbbfb304cee18b034e7b6&page=${page}`);
            let result_json = await result.json();
            for(let i=0; i<result_json.results.length; i++){
                result_json.results[i].media_type = "person"
            }
            this.setState({artists: result_json, what_is_pressed: null})
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { navigation:{navigate}  } = this.props;
        const { artists } = this.state;
        return (
            <LinearGradient
                colors={["#d3cce3","#e9e4f0"]}
                style={{flex: 1}}
            >
                {!artists.results &&<MyOverlay/>}
                <FlatList
                    data={artists.results}
                    keyExtractor={item=>item.id.toString()}
                    ListFooterComponent={()=>{
                        if(!!artists.results) {
                            return (<Pagination
                                pages={(artists.total_pages > 1000) ? 1000 : artists.total_pages}
                                page={artists.page}
                                moveTo={this.getPersons}
                                what_is_pressed={this.state.what_is_pressed}
                            />)
                        }
                        return <View/>
                    }}
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
    mapStateToProps
)(ArtistsScreen);