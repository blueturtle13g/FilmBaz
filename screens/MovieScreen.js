import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../actions';
// import { NavigationEvents } from "react-navigation";
import Item from "../components/item/Item";

class MovieScreen extends Component {

    render() {
        const { updateProp, store:{ current_movie }, navigation } = this.props;
        console.log("current_movie: ", this.props.store.current_movie);
        return (
            <View style={styles.container}>
                <Item
                    item={current_movie}
                    full_mode
                    navigation={navigation}
                />
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
)(MovieScreen);

const styles = StyleSheet.create({
    container:{
        
    }
});
