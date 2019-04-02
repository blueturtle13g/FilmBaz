import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Orientation from 'react-native-orientation';
import { NavigationEvents } from "react-navigation";
import { WebView } from "react-native-webview";
import Entypo from 'react-native-vector-icons/Entypo';

export default class Trailer  extends React.Component{
    state={
        key: 1
    };

    urlChanged = webview_state => {
        if (webview_state.url !== this.props.navigation.getParam('uri', null)) {
            this.setState({key: this.state.key + 1});
        }
    };

    render() {
        return (
            <View
                style={styles.container}
                key={this.state.key}
            >
                <StatusBar hidden/>
                <NavigationEvents
                    onDidFocus={Orientation.lockToLandscape}
                    onWillBlur={Orientation.unlockAllOrientations}
                />
                <TouchableOpacity
                    activeOpacity={.7}
                    style={styles.back}
                    onPress={()=>this.props.navigation.goBack()}
                >
                    <Entypo name={"forward"} size={40}/>
                </TouchableOpacity>
                <View style={styles.youtube_prevent}/>
                <WebView
                    style={{flex: 1}}
                    ref={element => this.WebView_ref = element}
                    source={{uri: this.props.navigation.getParam('uri', null)}}
                    onNavigationStateChange={this.urlChanged}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    youtube_prevent:{
        zIndex: 10,
        position: "absolute",
        height: 60,
        right: 0,
        left: 0,
        top: 0,
    },
    back:{
        position: "absolute",
        zIndex: 15,
        top: 15,
        left: 15,
        backgroundColor: "#ffffff",
        paddingHorizontal: 5,
        borderRadius: 16
    }
});
