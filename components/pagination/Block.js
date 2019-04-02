import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet ,
    ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const renderContent = (in_progress, back, forward, page)=>{
    if(in_progress) return <ActivityIndicator color={"#fff"}/>;
    if(back || forward) return <Ionicons size={33} color={"#ffffff"} name={`ios-arrow-${forward ? "forward" : "back"}`}/>;
    else return <Text style={styles.txt}>{page}</Text>
};

export default ({moveTo, page, active, in_progress, disabled, back, forward})=>{
    return (
        <TouchableOpacity
            style={[styles.block, active && styles.active_block]}
            disabled={disabled}
            onPress={()=>{
                if(!disabled) moveTo(page)
            }}
        >
            {renderContent(in_progress, back, forward, page)}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    block:{
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#051e3e",
        marginHorizontal: 3,
        paddingHorizontal: 3,
        minWidth: 25
    },
    active_block:{
        backgroundColor: "#051e3e"
    },
    txt:{
        fontSize: 23,
        fontWeight: "500",
        color: "#ffffff"
    }
});
