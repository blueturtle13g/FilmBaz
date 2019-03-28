import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    I18nManager,
    TouchableOpacity,
    Image,
    NetInfo,
    Alert,
    PermissionsAndroid,
    YellowBox
} from 'react-native';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';

import { updateProp } from '../actions';
import {
    WISH_LIST_SCREEN,
    NETWORK_ERR,
    SECTIONS_IMG,
    ARTICLE_IMG,
    FAVORITE_SCREEN,
    ARTICLES_SCREEN,
    SEEN_SCREEN,
    TOP_SCREEN,
    IS_PERMITTED,
    UNSPLASH_BASE_REQ,
    UNSPLASH_CLIENT_ID,
    FESTIVAL_IMG,
    FESTIVALS_SCREEN
} from "../actions/types";
import Search from '../components/absolute/Search';

class HomeScreen extends Component {
    state={
    };

    async componentDidMount() {
        YellowBox.ignoreWarnings([
            "Warning: NetInfo has been extracted from react-native core and will be removed in a future release. " +
            "It can now be installed and imported from '@react-native-community/netinfo' instead of 'react-native'. " +
            "See https://github.com/react-native-community/react-native-netinfo",
            'Remote debugger is in a background tab which may cause apps to perform slowly',
        ]);
        if(!I18nManager.isRTL) RNRestart.Restart();
        this.netInfoLisntener = NetInfo.addEventListener('connectionChange', this.handleNetChange);
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'اجازه دسترسی به مستندات',
                message: 'فیلم باز جهت دسترسی به عکس های شما، نیازمند این اجازه می باشد.',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.props.updateProp({key: IS_PERMITTED, value: true})
        } else {
            Alert.alert(
                'دسترسی',
                'دسترسی به گالری لغو شد!'
            );
        }
        NetInfo.isConnected.fetch().then(isConnected=> {
            // console.log("isConnected: ", isConnected);
            if(isConnected) this.getImages();
        });
    }

    componentWillUnmount() {
        this.netInfoLisntener.remove();
    }

    getImages = async ()=>{
        try {
            let sections_img = await fetch(
                `${UNSPLASH_BASE_REQ}movie&page=${Math.floor(Math.random() * 80) + 1 }&per_page=4${UNSPLASH_CLIENT_ID}`
            );
            let sections_img_json = await sections_img.json();
            if(sections_img_json.results.length > 3){
                // console.log("sections_img_json: ", sections_img_json);
                this.props.updateProp({
                    key: SECTIONS_IMG,
                    value: [
                        {uri: sections_img_json.results[0].urls.small},
                        {uri: sections_img_json.results[1].urls.small},
                        {uri: sections_img_json.results[2].urls.small},
                        {uri: sections_img_json.results[3].urls.small},
                    ]
                });
            }
        } catch (error) {
            console.error(error);
        }
        try {
            let article_img = await fetch(
                `${UNSPLASH_BASE_REQ}read&page=${Math.floor(Math.random() * 850) + 1 }&per_page=1${UNSPLASH_CLIENT_ID}`
            );
            let article_img_json = await article_img.json();
            if(!!article_img_json.results.length) {
                this.props.updateProp({
                    key: ARTICLE_IMG,
                    value: {uri: article_img_json.results[0].urls.small}
                });
            }
        } catch (error) {
            console.error(error);
        }
        try {
            let festival_img = await fetch(
                `${UNSPLASH_BASE_REQ}festival&page=${Math.floor(Math.random() * 5000) + 1 }&per_page=1${UNSPLASH_CLIENT_ID}`
            );
            let festival_img_json = await festival_img.json();
            if(!!festival_img_json.results.length) {
                this.props.updateProp({
                    key: FESTIVAL_IMG,
                    value: {uri: festival_img_json.results[0].urls.small}
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    handleNetChange = async (info) => {
        if(info.type === 'none') this.props.updateProp({key: NETWORK_ERR, value: "لطفا اینترنت خود را متصل کنید."});
        else  this.props.updateProp({key: NETWORK_ERR, value:  ""});
    };

    renderImage = i=>{
        const { sections_img, festival_img, article_img } = this.props.store;
        if(i < 4){
             return <Image
                 style={styles.link_img}
                 source={sections_img[i]}
             />
        }
        if(i === 4){
            return <Image
                style={styles.link_img}
                source={festival_img}
            />
        }
        return <Image
            style={styles.link_img}
            source={article_img}
        />
    };

    render() {
        const { updateProp, store:{ sections }, navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.links}>

                    {sections.map((section, i)=>{
                        return(
                            <TouchableOpacity
                                key={section}
                                activeOpacity={.7}
                                style={styles.link}
                                onPress={()=>{
                                    switch (i){
                                        case 0:
                                            navigation.navigate(FAVORITE_SCREEN);
                                            break;
                                        case 1:
                                            navigation.navigate(WISH_LIST_SCREEN);
                                            break;
                                        case 2:
                                            navigation.navigate(SEEN_SCREEN);
                                            break;
                                        case 3:
                                            navigation.navigate(TOP_SCREEN);
                                            break;
                                        case 4:
                                            navigation.navigate(FESTIVALS_SCREEN);
                                            break;
                                        case 5:
                                            navigation.navigate(ARTICLES_SCREEN);
                                    }
                                }}
                            >
                                {this.renderImage(i)}
                                <Text style={styles.link_txt}>{section}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <Search navigation={navigation}/>
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
)(HomeScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    links:{
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: .5
    },
    link:{
        width: "50%",
        height: 60,
        backgroundColor: "#005b96",
        borderWidth: .5,
        borderColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 4
    },
    link_img:{
        width: 70,
        height: 59,
        resizeMode: "cover",
    },
    link_txt:{
        fontSize: 19,
        paddingRight: 5,
        fontWeight: "400",
        color: "#f9f4f4"
    },
});
