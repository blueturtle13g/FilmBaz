import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { TMDB_IMG_BASE} from "../../actions/types";
import {correct_date, toPersian} from "../../utils";
const w = Dimensions.get('window');

export default ({item, i, handleLink})=>{

    return (
        <View style={[styles.container, i%2 ? {backgroundColor: "#d8d8dc"} : {backgroundColor: "#eec9d2"}]}>
            <TouchableOpacity
                activeOpacity={.8}
                style={styles.img_con}
                onPress={()=>handleLink(item.id)}
            >
                <Image
                    style={styles.img}
                    source={{uri: TMDB_IMG_BASE+item.poster_path}}
                />
            </TouchableOpacity>

            <View style={styles.details}>
                <Text style={styles.txt} numberOfLines={1}>{item.name || item.title}</Text>
                <Text style={styles.txt}>{toPersian(item.vote_average)}</Text>
                <Text style={styles.txt}>{toPersian(correct_date(item.first_air_date || item.release_date))}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height: 300,
        width: w.width/2,
    },
    img_con:{
        width: "100%",
        height: "80%",
    },
    img:{
        flex: 1
    },
    details:{
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    txt:{
        textAlign: "center"
    }
});


