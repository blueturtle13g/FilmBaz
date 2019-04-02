import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import {
    TMDB_BASE_REQ,
    TMDB_API_KEY,
    APPEND_MOVIE,
    CURRENT_MOVIE,
    MOVIE_SCREEN,
    DYNAMIC_TITLE,
    SIMILAR_RESULTS,
    TMDB_IMG_BASE,
    LANDSCAPE
} from '../../actions/types';
import { connect } from 'react-redux';
import { updateProp } from '../../actions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {correct_date, toPersian} from "../../utils";
const w = Dimensions.get("window");

class MyCarousel extends Component {
    state={
        activeSlide: 0,
        loading: false
    };

    handleLink =async id=>{
        const { updateProp, navigate, store:{network_err}} = this.props;
        if(this.state.is_handling || network_err) return;
        this.setState({is_handling: true});
        try {
            let results = await fetch(`${TMDB_BASE_REQ}/movie/${id}${TMDB_API_KEY}${APPEND_MOVIE}`);
            let results_json = await results.json();
            results_json.media_type = "movie";
            try {
                let similar_results = await fetch(`${TMDB_BASE_REQ}/movie/${id}/similar${TMDB_API_KEY}`);
                let similar_results_json = await similar_results.json();
                updateProp([
                    {key: CURRENT_MOVIE, value: results_json},
                    {key: DYNAMIC_TITLE, value: results_json.title || results_json.name},
                    {key: SIMILAR_RESULTS, value: similar_results_json.results.slice(0, 10)}
                ]);
                this.setState({is_handling: false});
            } catch (error) {
                console.error(error);
            }
            navigate(MOVIE_SCREEN)
        } catch (error) {
            console.error(error);
        }
    };

    pagination =()=>{
        const { activeSlide } = this.state;
        const { data } = this.props;
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ marginBottom: -73, width: "80%", justifyContent: "space-around" }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };

    _renderItem = ({
        item:{
            poster_path,
            title,
            name,
            vote_count,
            first_air_date,
            release_date,
            vote_average,
            id
    }, index})=> {
        return (
            <TouchableOpacity
                style={[styles.slide, index%2  ? {backgroundColor: "#2ab7ca"} : {backgroundColor: "#eec9d2"}]}
                activeOpacity={.8}
                onPress={()=>this.handleLink(id)}
            >
                {this.state.loading &&<View style={styles.loading}><ActivityIndicator size={"large"} color={"#fff"}/></View>}
                <Image
                    onLoadStart={() =>this.setState({loading: true})}
                    onLoad={() =>this.setState({loading: false})}
                    source={{uri: TMDB_IMG_BASE+poster_path}}
                    style={{width: "100%", height: "80%"}}
                />
                <View style={{height: "20%"}}>
                    <Text style={[styles.txt, styles.title]} numberOfLines={1}>{ title || name }</Text>
                    <Text style={styles.txt}>
                        امتیاز
                        {" " + toPersian(vote_average) + " "}
                        از
                        {" " + toPersian(vote_count.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + " "}
                        رای
                    </Text>
                    <Text style={styles.txt}>{toPersian(correct_date(first_air_date || release_date))}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { store:{ orientation }, data, minimal } = this.props;
        return (
            <View style={styles.container}>
                <Carousel
                    data={data}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    sliderWidth={orientation === LANDSCAPE ? w.height : w.width}
                    itemWidth={250}
                />
                {!minimal  && this.pagination()}
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
)(MyCarousel);

const styles = StyleSheet.create({
    container:{
        height: 320,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    slide:{
        height: 300,
        justifyContent: "center",
        alignItems: "center"
    },
    txt:{
        textAlign: "center",
    },
    title:{
        color: "#205370"
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
