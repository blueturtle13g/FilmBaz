import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    NetInfo,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../../actions';
import {
    TMDB_IMG_BASE,
    TMDB_BASE_REQ,
    TMDB_API_KEY,
    APPEND_MOVIE,
    CURRENT_MOVIE,
    CURRENT_PERSON,
    MOVIE_SCREEN,
    PERSON_SCREEN,
    DYNAMIC_TITLE
} from '../../actions/types';
import {correct_date, toPersian} from "../../utils";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

class ResultItem extends Component {
    state={
        is_handling: false
    };

    handleLink =(id, media_type)=>{
        if(this.state.is_handling) return;
        this.setState({is_handling: true});
        const { updateProp, store:{}, navigation} = this.props;
        NetInfo.isConnected.fetch().then(async isConnected=> {
            //https://api.themoviedb.org/3/movie/760?api_key=0b408f411f8fbbfb304cee18b034e7b6&append_to_response=videos
            if(isConnected){
                console.log(`${TMDB_BASE_REQ}/${media_type}/${id}${TMDB_API_KEY}${(media_type !== "person") ? APPEND_MOVIE : ""}`);
                try {
                    let results = await fetch(`${TMDB_BASE_REQ}/${media_type}/${id}${TMDB_API_KEY}${(media_type !== "person") ? APPEND_MOVIE : ""}`);
                    let results_json = await results.json();
                    console.log("results_json: ", results_json);
                    if(media_type !== "person"){
                        updateProp([
                            {key: CURRENT_MOVIE, value: results_json},
                            {key: DYNAMIC_TITLE, value: results_json.title || results_json.name},
                        ]);
                        navigation.navigate(MOVIE_SCREEN)
                    }else{
                        updateProp([
                            {key: CURRENT_PERSON, value: results_json},
                            {key: DYNAMIC_TITLE, value: results_json.title || results_json.name},
                        ]);
                        navigation.navigate(PERSON_SCREEN)
                    }

                    this.setState({is_handling: false});
                } catch (error) {
                    console.error(error);
                }
            }
            else ToastAndroid.show('لطفا اینترنت و فیلترشکن خود را روشن کنید..', ToastAndroid.SHORT);
        });
    };

    render() {
        const { updateProp, store:{}, item, index, results_length, full_mode } = this.props;
        console.log("full_mode: ", full_mode);
        if(item.media_type === "person") {
            return (
                <View style={[styles.item, (index+1 === results_length) && {marginBottom: 43}]}>
                    <View style={[styles.head_section, {height: "100%"}]}>

                        <TouchableOpacity
                            activeOpacity={.8}
                            style={styles.img_con}
                            onPress={()=>this.handleLink(item.id, "person")}
                        >
                            <Image
                                style={styles.img}
                                source={{uri: TMDB_IMG_BASE + item.profile_path}}
                            />
                        </TouchableOpacity>

                        <View style={styles.details}>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>نام: </Text>
                                <Text
                                    onPress={()=>this.handleLink(item.id, "person")}
                                    style={[styles.txt, styles.val]}
                                >
                                    {item.name}
                                </Text>
                            </View>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>محبوبیت: </Text>
                                <Text style={[styles.txt, styles.val]}>{item.popularity}</Text>
                            </View>

                            <View style={styles.known_for}>
                                <Text style={[styles.txt]}>اثر برجسته: </Text>
                                {item.known_for.map((art, i) => {
                                    return<Text
                                        key={art.id}
                                        style={styles.art}
                                        onPress={()=>this.handleLink(art.id, "movie")}
                                    >
                                        {i + 1}- {art.name || art.title}
                                    </Text>
                                })}
                            </View>

                        </View>
                    </View>
                </View>
            );
        }
        console.log("item: ", item);
            // created_by: [{…}]
            // genres: (2) [{…}, {…}]
            // homepage: ""
            // id: 19614
            // in_production: false
            // languages: ["en"]
            // last_air_date: "1990-11-20"
            // networks: [{…}]
            // next_episode_to_air: null
            // number_of_episodes: 2
            // number_of_seasons: 1
            // origin_country: (2) ["CA", "US"]
            // original_language: "en"
            // overview: "In 1960, seven outcast kids known as "The Loser Club" fight an evil demon who poses as a child-killing clown. Thirty years later, they reunite to stop the demon once and for all when it returns to their hometown."
            // popularity: 14.244
            // poster_path: "/o3uwaF1zmarUiGYiIDY0OKZ4gdp.jpg"
            // production_companies: (3) [{…}, {…}, {…}]
            // seasons: [{…}]
            // status: "Ended"
            // type: "Miniseries"
            // videos: {results: Array(1)}
            return (
                <View style={styles.item} >
                    <View style={styles.head_section}>

                        <Image
                            style={styles.img}
                            source={{uri: TMDB_IMG_BASE+item.poster_path}}
                        />

                        <View style={styles.details}>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>نام: </Text>
                                <Text
                                    style={[styles.txt, styles.val, styles.long_txt]}
                                >
                                    {item.name || item.title}
                                </Text>
                            </View>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>نوع: </Text>
                                <Text style={[styles.txt, styles.val]}>
                                    {item.media_type === "tv"
                                        ?
                                        " سریال"
                                        :
                                        " سینمایی"
                                    }
                                </Text>
                            </View>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>تعداد رای: </Text>
                                <Text style={[styles.txt, styles.val]}>{toPersian(item.vote_count)}</Text>
                            </View>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>امتیاز: </Text>
                                <Text style={[styles.txt, styles.val]}>{toPersian(item.vote_average)}</Text>
                            </View>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>تاریخ انتشار: </Text>
                                <Text style={[styles.txt, styles.val]}>
                                    {!!item.first_air_date
                                        ?
                                        toPersian(correct_date(item.first_air_date))
                                        :
                                        toPersian(correct_date(item.release_date))
                                    }
                                </Text>
                            </View>

                            <View style={styles.key_val}>
                                <Text style={styles.txt}>زبان: </Text>
                                <Text style={[styles.txt, styles.val]}>{item.original_language}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.bottom_section}>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>تگ: </Text>
                            <Text style={[styles.txt, styles.val]}>{toPersian(item.tagline)}</Text>
                        </View>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>محبوبیت: </Text>
                            <Text style={[styles.txt, styles.val]}>{toPersian(item.popularity)}</Text>
                        </View>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>کشور: </Text>
                            <Text style={[styles.txt, styles.val]}>{toPersian(item.origin_country)}</Text>
                        </View>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>بودجه: </Text>
                            <Text style={[styles.txt, styles.val]}>{toPersian(item.budget)}</Text>
                        </View>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>سود: </Text>
                            <Text style={[styles.txt, styles.val]}>{toPersian(item.revenue)}</Text>
                        </View>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>فیلم بزرگسالان: </Text>
                            <Text style={[styles.txt, styles.val]}>
                                {item.adult
                                    ?
                                    " بله"
                                    :
                                    " خیر"
                                }
                            </Text>
                        </View>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>منتشر شده:</Text>
                            {item.status === "Released"
                                ?
                                <AntDesign name={"check"} size={30} color={"#1b705f"}/>
                                :
                                <Entypo name={"circle-with-cross"} size={20} color={"#dd1b33"}/>
                            }
                        </View>

                        <View style={styles.key_val}>
                            <Text style={styles.txt}>سود: </Text>
                            <Text style={[styles.txt, styles.val]}>{toPersian(item.revenue)}</Text>
                        </View>

                        <Text style={styles.txt}>ژانر: </Text>
                        {item.genres.map(genre=><Text style={styles.txt} key={genre.id}>{genre.name}</Text>)}

                        <Text style={styles.txt}>شرکت های تولید کننده: </Text>
                        {item.production_companies &&(
                            item.production_companies.map(company=>{
                                return(
                                    <Text style={styles.txt} key={company.id}>{company.name}</Text>
                                )
                            })
                        )}

                        <Text style={[styles.txt, styles.overview]}>
                            {!!item.overview && item.overview.substring(0, 170) + "..."}
                        </Text>

                    </View>

                </View>
            );
        }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateProp}
)(ResultItem);

const styles = StyleSheet.create({
    item:{
        width: "99%",
        height: 300,
        alignSelf: "center",
        backgroundColor: "#2b2b2b",
        margin: 2,
        overflow: "hidden",
        elevation: 5
    },
    head_section:{
        height: "70%",
        width: "100%",
        flexDirection: "row",
    },
    bottom_section:{
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    img:{
        flex: 1
    },
    details:{
        width: "55%",
        padding: 4
    },
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
        textAlign: "right"
    },
    overview:{
        fontSize: 16,
        textAlign: "center",
        margin: 1,
        color: "#e0e0e4",
    },
    known_for:{
        borderBottomWidth: .5,
        borderColor: "#fff"
    },
    artist_arts:{
        marginHorizontal: 1,
    },
    art:{
        color: "#3ca3d3",
        textAlign: "right",
        marginVertical: 5,
    },
});
