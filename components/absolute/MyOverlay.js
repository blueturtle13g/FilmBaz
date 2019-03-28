import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default (props)=>{
    if(props.activity){
        return(
        <View style={[styles.overlay]} pointerEvents="none">
            <ActivityIndicator size={"large"} color={"#fff"}/>
            <Text style={styles.loading_text}>درحال بارگذاری...</Text>
        </View>
        )
    }
    return (
        <View style={[styles.overlay]} pointerEvents="box-none">

            <Text
                style={styles.ErrText}
                onPress={props.hideOverlay}
            >
                {props.text}
            </Text>

            {props.retry &&(
                <TouchableOpacity
                    style={styles.reloadCon}
                    onPress={props.retry}
                >
                    <SimpleLineIcons
                        name={"reload"}
                        size={25}
                        color={"#3a9f91"}
                    />
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    ErrText:{
        padding: 5,
        fontSize: 19,
        borderRadius: 50,
        color: "#d8e7dc",
        backgroundColor: 'rgb(255, 63, 68)',
        marginBottom: 10
    },
    reloadCon:{
        backgroundColor: "#d8e7dc",
        padding: 5,
        borderRadius: 50
    },
    loading_text:{
        color: "#fff",
        textAlign: "center",
        fontSize: 22,
        marginTop: 10
    }
});