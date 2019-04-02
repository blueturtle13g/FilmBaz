import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';

const w = Dimensions.get("window");
import { updateProp } from '../../actions';
import {
    SEARCH_RESULTS,
    RESULTS_SCREEN,
    TMDB_API_KEY,
    TMDB_BASE_REQ,
    LANDSCAPE,
    SEARCH_TXT
} from "../../actions/types";

class Search extends Component {
    state={
        is_searching: false,
        not_found: false,
        is_expanded: false
    };

    getResults = async ()=>{
        const { updateProp, store:{ search_txt, network_err } , navigate } = this.props;
        if(network_err) return;
        this.setState({is_searching: true});
        try {
            let results = await fetch(
                `${TMDB_BASE_REQ}/search/multi${TMDB_API_KEY}&query=${search_txt}`
            );
            let results_json = await results.json();
            if(!!results_json.results.length){
                this.setState({not_found: false});
                updateProp({
                    key: SEARCH_RESULTS,
                    value: results_json
                });
                this.setState({is_searching: false});
                navigate(RESULTS_SCREEN);
            }else{
                this.setState({not_found: true});
            }
        } catch (error) {
            console.error(error);
        }
    };

    renderIcon = ()=>{
        const { is_searching, is_expanded } = this.state;
        if(is_searching) return<ActivityIndicator size="large" color="#fff"/>;
        else if(!is_expanded)return <Ionicons name={"md-search"} color={"#fff"} size={30}/>;
        else return <Entypo name={`chevron-thin-left`} size={30}  color="#fff"/>
    };

    render() {
        const { store:{orientation, search_txt}, updateProp } = this.props;
        const { is_searching, not_found, is_expanded } = this.state;
        const width = orientation === LANDSCAPE ? w.height-5 : w.width-5;
        return (
            <Animatable.View
                transition={"width"}
                style={[styles.container, is_expanded &&{width}]}
            >
                {(not_found && is_expanded) &&(
                    <Text
                        style={styles.no_item}
                    >
                        هیچ موردی یافت نشد.
                    </Text>
                )}
                <View style={styles.search}>
                    <TouchableOpacity
                        style={styles.search_icon}
                        onPress={()=>this.setState({is_expanded: !is_expanded})}
                    >
                        {this.renderIcon()}
                    </TouchableOpacity>
                    <TextInput
                        onBlur={()=>this.setState({is_expanded: false})}
                        style={styles.search_input}
                        value={search_txt}
                        onChangeText={search_txt=>updateProp({key: SEARCH_TXT, value: search_txt})}
                        onSubmitEditing={()=>{
                            if(!is_searching && !!search_txt.trim())this.getResults()
                        }}
                    />
                </View>
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
    mapStateToProps, {updateProp}
)(Search);

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        bottom: 3,
        alignSelf: "flex-end",
        width: 45
    },
    search:{
        height: 46,
        backgroundColor: "#2b2b2b",
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
        height: "100%",
        width: 45,
        backgroundColor: "#205370",
        justifyContent: "center",
        alignItems: "center",
    },
    no_item:{
        color: "#2b2b2b",
        fontSize: 18,
        textAlign: "center",
        marginHorizontal: 3
    }
});
