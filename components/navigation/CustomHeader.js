import React from "react";
import { Header } from "react-navigation";
import {
    Platform,
    Text,
    StyleSheet,
    Dimensions,
    View
} from "react-native";
import {connect} from "react-redux";

const w = Dimensions.get("window");

class CustomHeader extends React.Component{
    render(){
        return (
            <View
                style={[styles.container, Platform.OS === "ios" && {marginTop:20}]}
            >
                <Header {...this.props} />
                <Text style={styles.title}>{this.props.title || this.props.store.dynamic_title.substring(0, 20)}</Text>
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
    mapStateToProps
)(CustomHeader);

const styles = StyleSheet.create({
    title:{
        position: "absolute",
        height: "100%",
        width: 250,
        right: (w.width/2)-125,
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: "400",
        color: "#fff",
        fontSize: 24
    },
    container:{
        height: 56,
        width: "100%",
        backgroundColor: "#13171a",
        overflow: "hidden"
    },
});