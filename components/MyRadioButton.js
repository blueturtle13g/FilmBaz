import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {IS_INCOME} from "../actions/types";

export default ({ is_income, updateValue })=>{
    return (
        <View style={styles.horizontalInput}>

            <CheckBox
                containerStyle={styles.checkBox}
                textStyle={{color: "#77847f"}}
                title='درآمد'
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={is_income}
                onPress={()=>updateValue(IS_INCOME, true)}
            />
            <CheckBox
                containerStyle={styles.checkBox}
                textStyle={{color: "#77847f"}}
                title='هزینه'
                iconRight
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!is_income}
                onPress={()=>updateValue(IS_INCOME, false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    horizontalInput:{
        width: "100%",
        justifyContent: "space-between",
        alignSelf: "center",
        flexDirection: "row"
    },
    checkBox: {
        backgroundColor: "transparent",
        borderWidth: 0,
        width: "35%",
        padding: 7
    }
});
