import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default ()=>{
    return(
    <View style={styles.overlay} pointerEvents="none">
        <ActivityIndicator size={"large"} color={"#fff"}/>
        <Text style={styles.loading_text}>درحال بارگذاری...</Text>
    </View>
    )
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
    loading_text:{
        color: "#fff",
        textAlign: "center",
        fontSize: 22,
        marginTop: 10
    }
});