import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const KnownFor = ({onPress, val, keyy})=>{
    return (
        <View style={styles.known_for}>
            <Text style={styles.txt}>{keyy}:</Text>
            {val.map((art, i) => {
                return<Text
                    key={art.id}
                    style={styles.art}
                    onPress={()=>onPress(art.id, "movie")}
                >
                    {i + 1}- {art.name || art.title}
                </Text>
            })}
        </View>
    );
};

export default KnownFor;

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
        textAlign: "left",
        color: "#fff",
        fontSize: 18
    },
});
