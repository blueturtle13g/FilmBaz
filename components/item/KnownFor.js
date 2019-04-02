import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default ({keyy, val, full_mode, onPress})=>{
    return (
        <View style={styles.known_for}>
            <Text style={styles.txt}>{keyy}:</Text>
            {val.map((art, i) => {
                const { name, id, media_type, title} = art;
                return<Text
                    onPress={()=>{
                        if(!full_mode)onPress(id, media_type)
                    }}
                    key={full_mode ? art : id}
                    style={[styles.art, full_mode && {color: "#2ab7ca"}]}
                >
                    {i + 1} - {full_mode ? art : name || title}
                </Text>
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    known_for:{
        borderBottomWidth: .5,
        borderColor: "#fff"
    },
    art:{
        color: "#3ca3d3",
        textAlign: "right",
        marginVertical: 5,
    },
    txt:{
        textAlign: "right",
        color: "#fff",
        fontSize: 18
    },
});
