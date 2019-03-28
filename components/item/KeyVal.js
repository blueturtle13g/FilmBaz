import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const KeyVal = ({keyy, val, onPress})=>{
    console.log("keyy: ", keyy);
    console.log("val: ", val);
    return (
        <View style={styles.key_val}>
            <Text style={styles.txt}>{keyy}: </Text>
            <Text
                style={[styles.txt, styles.val, (keyy === "نام") && styles.long_txt]}
                onPress={onPress}
            >
                {val}
            </Text>
        </View>
    );
};

export default KeyVal;

const styles = StyleSheet.create({
    key_val:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        borderBottomWidth: .5,
        borderColor: "#fff"
    },
    txt:{
        textAlign: "left",
        color: "#fff",
        fontSize: 18
    },
    val:{
        minWidth: 70,
        color: "#2ab7ca",
        textAlign: "center",
    },
    long_txt:{
        flex: 1,
        textAlign: "right"
    },
});
