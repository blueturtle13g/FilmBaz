import React from "react";
import { Header } from "react-navigation";
import {
    Platform,
    Text,
    StyleSheet,
    View,
    StatusBar
} from "react-native";
import {connect} from "react-redux";

const CustomHeader =props=>{
    const { network_err, dynamic_title } = props.store;
    return (
        <View
            style={[
                styles.container,
                Platform.OS === "ios" && {marginTop:20},
                network_err && {backgroundColor: "rgb(255, 63, 68)"}
            ]}
        >
            <StatusBar
                backgroundColor={network_err ? "rgb(255, 63, 68)" : "transparent"}
                barStyle="dark-content"
                translucent
            />

            <Header {...props} />
            {!!network_err &&<Text style={styles.err_txt}>لطفا اینترنت و فیلترشکن خود را متصل کنید.</Text>}
            <Text
                style={styles.title}
                numberOfLines={1}
            >
                {props.title || dynamic_title}
            </Text>

        </View>
    );
};

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
        width: "74%",
        right: "13%",
        left: "13%",
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: "400",
        color: "#2b2b2b",
        fontSize: 24
    },
    container:{
        height: 56,
        width: "100%",
        backgroundColor: "transparent",
        marginTop: 8
    },
    err_txt:{
        position: "absolute",
        top: 50,
        padding: 5,
        fontSize: 19,
        width: "100%",
        textAlign: "center",
        color: "#d8e7dc",
        backgroundColor: 'rgb(255, 63, 68)',
        marginBottom: 10
    }
});