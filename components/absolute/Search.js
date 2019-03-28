import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    NetInfo,
    ToastAndroid,
    ActivityIndicator,
    UIManager,
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import { updateProp } from '../../actions';
import {
    SEARCH_ERR,
    SEARCH_RESULTS,
    RESULTS_SCREEN,
    SEARCH_TXT,
    SECTIONS_IMG,
    TMDB_API_KEY,
    TMDB_BASE_REQ,
    UNSPLASH_CLIENT_ID,
    LANGUAGE_FA
} from "../../actions/types";

class Search extends Component {
    state={
        is_searching: false,
        not_found: false
    };

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    getResults = async ()=>{
        this.setState({is_searching: true});
        const { updateProp, store:{ search_txt }, navigation } = this.props;
        console.log(`${TMDB_BASE_REQ}/search/multi${TMDB_API_KEY}&query=${search_txt}`);
        try {
            let results = await fetch(
                `${TMDB_BASE_REQ}/search/multi${TMDB_API_KEY}&query=${search_txt}`
            );
            let results_json = await results.json();
            this.setState({is_searching: false});
            if(!!results_json.results.length){
                this.setState({not_found: false});
                console.log("results_json: ", results_json);
                updateProp({
                    key: SEARCH_RESULTS,
                    value: results_json
                });
                navigation.navigate(RESULTS_SCREEN);
            }else{
                this.setState({not_found: true});
            }
        } catch (error) {
            console.error(error);
        }
    };

    triggerSearch = ()=>{
        const { updateProp, store:{ search_txt }, navigation } = this.props;
        NetInfo.isConnected.fetch().then(isConnected=> {
            console.log("isConnected: ", isConnected);
            if(isConnected)  this.getResults();
            else ToastAndroid.show('لطفا اینترنت و فیلترشکن خود را روشن کنید..', ToastAndroid.SHORT);
        });
    };

    render() {
        const { updateProp, store:{ search_txt }, navigation } = this.props;
        const { is_searching, not_found } = this.state;
        return (
            <View style={styles.container}>
                {not_found &&(
                    <Text
                        style={styles.no_item}
                    >
                        هیچ موردی یافت نشد.
                    </Text>
                )}
                <View style={styles.search}>
                    <TouchableOpacity
                        style={styles.search_icon}
                        onPress={()=>{
                            if(!is_searching && !!search_txt.trim())this.triggerSearch()
                        }}
                    >
                        {is_searching
                            ?
                            <ActivityIndicator size="large" color="#fff"/>
                            :
                            <Ionicons name={"md-search"} color={"#fff"} size={30}/>
                        }
                    </TouchableOpacity>
                    <TextInput
                        style={styles.search_input}
                        value={search_txt}
                        onChangeText={value=>updateProp({key: SEARCH_TXT, value})}
                    />
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
)(Search);

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        bottom: 1,
        width: "99%",
        alignSelf: "center",
    },
    search:{
        height: 46,
        backgroundColor: "#2b2b2b",
        borderRadius: 30,
        marginTop: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden"
    },
    search_input:{
        flex: 1,
        color: "#ffffff",
        fontSize: 20
    },
    search_icon:{
        height: 45,
        width: 45,
        marginLeft: 1,
        backgroundColor: "#205370",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    no_item:{
        color: "#2b2b2b",
        fontSize: 18,
        textAlign: "center",
        marginHorizontal: 3
    }
});
