import React, { Component } from 'react';
import {
    StyleSheet,
    I18nManager,
    NetInfo,
    ScrollView,
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';
import MyCarousel from '../components/item/MyCarousel';
import LinearGradient from 'react-native-linear-gradient';
import { updateProp } from '../actions';
import {
    TMDB_BASE_REQ,
    TMDB_API_KEY,
    ORIENTATION,
    LANDSCAPE,
    NETWORK_ERR
} from "../actions/types";
import Search from '../components/absolute/Search';
import HomeLinks from '../components/HomeLinks';
import Orientation from 'react-native-orientation';
import MyOverlay from '../components/absolute/MyOverlay';

class HomeScreen extends Component {
    state={
        bests_of_current_year: [],
        net_err: ""
    };

    async componentDidMount() {
        Orientation.unlockAllOrientations();
        Orientation.addOrientationListener(this._orientationDidChange);
        this.getBestsOfYear();
        const refresh_interval = setInterval(()=>{
            if(!this.state.bests_of_current_year.length) this.getBestsOfYear();
            else clearInterval(refresh_interval);
        }, 7000);
        if (!I18nManager.isRTL) RNRestart.Restart();
        this.netInfoLisntener = NetInfo.addEventListener('connectionChange', this.handleNetChange);
    }
    _orientationDidChange =orientation=>this.props.updateProp({key: ORIENTATION, value: orientation});

    componentWillUnmount() {
        this.netInfoLisntener.remove();
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    handleNetChange = async (info) =>this.props.updateProp({ key: NETWORK_ERR, value: (info.type === 'none')});

    getBestsOfYear = ()=>{
        NetInfo.isConnected.fetch().then(async isConnected=> {
            if(isConnected){
                const shuttle_page = `&page=${Math.floor(Math.random()*120)+1}`;
                const conditions = `&sort_by=vote_average.desc&vote_count.gte=100&vote_average.gte=7`;
                try {
                    let bests_of_year = await fetch(
                        `${TMDB_BASE_REQ}/discover/movie${TMDB_API_KEY}${conditions}${shuttle_page}`);
                    let bests_of_year_json = await bests_of_year.json();
                    if(Math.floor(Math.random()*2)+1 === 1){
                        this.setState({bests_of_current_year: bests_of_year_json.results.slice(0, 10)})
                    }else{
                        this.setState({bests_of_current_year: bests_of_year_json.results.slice(10, 20)})
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            else this.props.updateProp({ key: NETWORK_ERR, value: true});
        });
    };

    render() {
        const {store:{ orientation}, navigation:{navigate}} = this.props;
        const {bests_of_current_year} = this.state;
        return (
            <LinearGradient
                colors={["#43cea2","#185a9d"]}
                style={styles.container}
            >
                {orientation === LANDSCAPE
                    ?
                    <ScrollView>
                        <HomeLinks navTo={target_screen=>navigate(target_screen)}/>
                        <MyCarousel data={bests_of_current_year} navigate={navigate}/>
                    </ScrollView>
                    :
                    <View>
                        <HomeLinks navTo={target_screen=>navigate(target_screen)}/>
                        <MyCarousel data={bests_of_current_year} navigate={navigate}/>
                    </View>
                }
                {!bests_of_current_year.length &&<MyOverlay/>}
                {!bests_of_current_year.length &&<Text
                    style={styles.vpn_err}
                >
                    لطفا از متصل بودن فیلترشکن اطمینان حاصل کنید.
                </Text>}
                <Search navigate={navigate}/>
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
)(HomeScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 2
    },
    vpn_err:{
        textAlign: "center",
        fontSize: 19,
        marginTop: -135
    }
});
