import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../actions';
import LinearGradient from 'react-native-linear-gradient';
import MyCarousel from '../components/item/MyCarousel';
import MyOverlay from '../components/absolute/MyOverlay';
import {
    GENRES,
    TMDB_API_KEY,
    TMDB_BASE_REQ
} from "../actions/types";

class TopScreen extends PureComponent {
    state={bests: []};

    componentDidMount() {
        this.getBestsOfGenres();
        const refresh_interval = setInterval(()=>{
            if(!this.state.bests.length) this.getBestsOfGenres();
            else clearInterval(refresh_interval);
        }, 7000)
    }

    getBestsOfGenres =()=>{
        if(this.props.store.network_err) return;
        const shuttle_page = `&page=${Math.floor(Math.random()*3)+1}`;
        const conditions = `&sort_by=vote_average.desc&vote_count.gte=100&vote_average.gte=7`;
        GENRES.forEach(async genre=>{
            try {
                let result = await fetch(
                    `${TMDB_BASE_REQ}/discover/movie${TMDB_API_KEY}${conditions}${shuttle_page}&with_genres=${genre.id}`);
                let result_json = await result.json();
                if(Math.floor(Math.random()*2)+1 === 1){
                    this.setState({bests: [
                        ...this.state.bests, {name: genre.name, items: result_json.results.slice(0, 10)}
                    ]});
                }else{
                    this.setState({bests: [
                        ...this.state.bests, {name: genre.name, items: result_json.results.slice(10, 20)}
                    ]});
                }
            } catch (error) {
                console.error(error);
            }
        });
    };

    render() {
        return (
            <LinearGradient
                colors={["#d3cce3","#e9e4f0"]}
                style={styles.container}
            >
                {!this.state.bests.length &&<MyOverlay/>}
                <FlatList
                    data={this.state.bests}
                    keyExtractor={({name})=>name}
                    renderItem={({item})=><View>
                            <MyCarousel
                                data={item.items}
                                navigate={this.props.navigation.navigate}
                                minimal
                            />
                            <Text style={styles.genre_txt}>{item.name}</Text>
                        </View>
                    }
                />
            </LinearGradient>
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
)(TopScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    genre_txt:{
        textAlign: "center",
        fontWeight: "400",
        color: "#2b2b2b",
        fontSize: 24
    },
});
