import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const OverView = ({txt})=>{
    return (
        <View style={styles.bottom_section}>
            <Text style={styles.overview}>
                {!!txt && txt.substring(0, 170) + "..."}
            </Text>
        </View>
    );
};

export default OverView;

const styles = StyleSheet.create({
    overview:{
        fontSize: 16,
        textAlign: "center",
        margin: 1,
        color: "#e0e0e4",
    },
    bottom_section:{
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
});
