import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    ActivityIndicator
} from 'react-native';
import {TMDB_IMG_BASE} from "../../actions/types";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ImgSection extends React.Component{
    state={
        loading: false
    };

    render(){
        const {onPress, img_path, full_mode, videos, watchTrailer} = this.props;
        let is_disabled = false;
        if(full_mode){
            if(!videos.length) is_disabled = true;
        }
        return (
            <TouchableOpacity
                disabled={is_disabled}
                activeOpacity={.8}
                style={[styles.img_con, full_mode && styles.img_con_full_mode]}
                onPress={()=>{
                    if(full_mode){
                        if(videos.length)watchTrailer()
                    } else onPress()
                }}
            >
                {full_mode &&(
                    <View style={styles.play}>
                        {!!videos.length &&(
                            <MaterialCommunityIcons
                                name={"play-circle-outline"}
                                size={100}
                                color={"#ffffff"}
                            />
                        )}
                    </View>
                )}
                {this.state.loading &&<View style={styles.loading}><ActivityIndicator size={"large"} color={"#fff"}/></View>}
                <Image
                    onLoadStart={() =>this.setState({loading: true})}
                    onLoad={() =>this.setState({loading: false})}
                    style={[styles.img, full_mode && {resizeMode: "contain"}]}
                    source={{uri: TMDB_IMG_BASE+img_path}}
                />
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    img_con:{
        width: "45%",
        backgroundColor: "#adcbe3"
    },
    img:{
        flex: 1,
    },
    play:{
        zIndex: 1000,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    img_con_full_mode:{
        width: "100%",
        height: 300
    },
    loading:{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});
