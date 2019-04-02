import React  from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {toPersian} from "../../utils";
import KeyVal from './KeyVal';
import ImgSection from './ImgSection';
import MovieOptions from "./MovieOptions";
import PersonDetails from "./PersonDetails";
import MovieDetails from "./MovieDetails";

export default ({ show_more, watchTrailer, item })=>{
    const { media_type, profile_path, poster_path, name, popularity, title, videos} = item;
    let is_person = false;
    let is_tv = false;
    switch (media_type){
        case "person": is_person= true; break;
        case "tv": is_tv= true;
    }
    return (
        <View style={[styles.item, show_more &&{paddingBottom: 20}]}>
            <ImgSection
                img_path={is_person ? profile_path : poster_path}
                full_mode
                videos={!!videos ? videos.results : []}
                watchTrailer={watchTrailer}
            />

            {!is_person &&<MovieOptions/>}

            <View style={styles.bottom_sec}>
                <KeyVal
                    keyy={"نام"}
                    val={name || title}
                />
                <KeyVal  keyy={"محبوبیت"} val={toPersian(popularity)}/>

                {is_person &&<PersonDetails item={item}/>}
                {!is_person &&<MovieDetails
                    item={item}
                    is_tv={is_tv}
                    show_more={show_more}
                />}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item:{
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#2b2b2b",
    },
    top_sec:{
        flexDirection: "row",
        height: 250,
    },
    trailer_button:{
        width: 100,
        height: 30,
        backgroundColor: "#3e82aa"
    },
    trailer_txt:{
        fontSize: 20,
        fontWeight: "400",
        fontStyle:"italic",
        textAlign: "center"
    },
    bottom_sec:{
        paddingHorizontal: 5
    },
    details:{
        width: "55%",
        padding: 4
    },
});