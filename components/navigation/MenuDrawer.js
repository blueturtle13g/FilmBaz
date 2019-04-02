import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    View,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { HOME_SCREEN } from '../../actions/types';
const w = Dimensions.get("window");

class MenuDrawer extends Component {

    render() {
        const { store:{ sections }, navigation:{navigate}  } = this.props;
        return (
            <View style={styles.container}>
            <View style={styles.links}>
                    <ScrollView>

                        <TouchableOpacity
                            style={styles.link}
                            onPress={()=>navigate(HOME_SCREEN)}
                        >
                            <Image
                                style={styles.link_img}
                                source={require("../../img/home.png")}
                            />
                        </TouchableOpacity>
                        {sections.map(({name, link, img})=>{
                            return(
                                <TouchableOpacity
                                    key={name}
                                    activeOpacity={.7}
                                    style={styles.link}
                                    onPress={()=>navigate(link)}
                                >
                                    <Image
                                        style={styles.link_img}
                                        source={img}
                                    />
                                </TouchableOpacity>
                            )
                        })}

                    </ScrollView>
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
    mapStateToProps
)(MenuDrawer);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center"
    },
    links:{
        overflow: "hidden",
        alignSelf: "center",
        backgroundColor: "#005b96",
        justifyContent:"center",
        alignItems: "center",
        flexDirection: "row",
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30
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
