import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default ({keyy, val, onPress, multiple_val, with_object, no_border})=>{
    return (
        <View style={[styles.key_val, no_border && {borderBottomWidth: 0}]}>
            <Text style={styles.txt}>{keyy}: </Text>
            {multiple_val
                ?
                <View style={{ justifyContent: "flex-end", width: "100%"}}>
                    {val.map((v,i)=>{
                    return(
                        <Text
                            key={with_object ? v.name : v}
                            style={[styles.txt, styles.val, {textAlign: "right",minWidth: 10}]}
                            onPress={onPress}
                        >
                            {with_object ? v.name : v} {(i < val.length-1) ? "," : ""}
                        </Text>
                    )
                })}
                </View>
                :
                <Text
                    style={[styles.txt, styles.val, (keyy === "نام") && styles.long_txt]}
                    onPress={onPress}
                >
                    {val}
                </Text>
            }
        </View>
    );
};

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
        textAlign: "right",
        marginRight: 5
    },
});
