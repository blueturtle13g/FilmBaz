import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../actions';
import { LANDSCAPE } from "../actions/types";

class HomeLinks  extends React.Component{
    state={loading: false};

    render() {
        const {store: {sections, orientation}, navTo} = this.props;
        const { loading } = this.state;
        return (
            <View style={styles.links}>
                {sections.map(({name, img, link}) => {
                    return (
                        <View
                            style={[styles.link_con, orientation === LANDSCAPE && {width: "33.33%"}]}
                            key={name}
                        >
                            <TouchableOpacity
                                activeOpacity={.7}
                                style={styles.link}
                                onPress={() => navTo(link)}
                            >
                                {loading &&<View style={styles.loading}><ActivityIndicator size={"small"} color={"#fff"}/></View>}
                                <Image
                                    onLoadStart={() =>this.setState({loading: true})}
                                    onLoad={() =>this.setState({loading: false})}
                                    style={styles.link_img}
                                    source={img}
                                />
                                <Text style={styles.link_txt}>{name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        );
    }
};

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateProp}
)(HomeLinks);

const styles = StyleSheet.create({
    links:{
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 4,
    },
    link_con:{
        width: "50%",
        height: 60,
    },
    link:{
        flex: 1,
        margin: 1,
        flexDirection: "row",
        backgroundColor: "#e9ece5",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 5
    },
    link_img:{
        width: 70,
        height: "100%",
        resizeMode: "cover",
    },
    link_txt:{
        fontSize: 19,
        fontWeight: "400",
        color: "#2b2b2b",
        flex: 1,
        textAlign: "center"
    },
    loading:{
        position: "absolute",
        left: 20
    },
});
