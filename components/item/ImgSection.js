import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import {TMDB_IMG_BASE} from "../../actions/types";

const ImgSection = ({onPress, img_path})=>{
    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={styles.img_con}
            onPress={onPress}
        >
            <Image
                style={styles.img}
                source={{uri: TMDB_IMG_BASE+img_path}}
            />
        </TouchableOpacity>
    );
};

export default ImgSection;

const styles = StyleSheet.create({
    img_con:{
        width: "45%"
    },
    img:{
        flex: 1
    },
});
