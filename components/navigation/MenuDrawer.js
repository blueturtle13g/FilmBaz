import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../../actions';
import Profile from './Profile';
import LinearGradient from 'react-native-linear-gradient';

import {
    SEEN_SCREEN,
    WISH_LIST_SCREEN,
    HOME_SCREEN,
    FAVORITE_SCREEN,
    TOP_SCREEN,
    ARTICLES_SCREEN,
    FESTIVALS_SCREEN
} from '../../actions/types';

class MenuDrawer extends Component {

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
        const { updateProp, store:{ sections_img, article_img, sections }, navigation  } = this.props;
        return (
            <LinearGradient
                style={styles.container}
                colors={["rgba(85,88,218,1)", "rgba(95,209,249,1)"]}
            >
                <Profile/>
                <ScrollView>

                    <TouchableOpacity
                        style={styles.link}
                        onPress={()=>navigation.navigate(HOME_SCREEN)}
                    >
                        <Image
                            style={styles.link_img}
                            source={require("../../img/home.png")}
                        />
                        <Text style={styles.link_txt}>خانه</Text>
                    </TouchableOpacity>
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
                                            navigation.navigate(WISH_LIST_SCREEN,);
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

                </ScrollView>
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
)(MenuDrawer);

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    link:{
        height: 60,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 2
    },
    link_img:{
        width: 55,
        height: 55,
        resizeMode: "cover",
        borderRadius: 140
    },
    link_txt:{
        fontSize: 20,
        fontWeight: "400",
        color: "#1b1b1b",
        marginLeft: 8,
    },
    user_name:{
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 10
    },
    user_name_input:{
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: "#1b1b1b",
        padding: 2,
        fontSize: 35,
        fontWeight: "600"
    }
});
