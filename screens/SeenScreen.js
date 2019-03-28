import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../actions';

class SeenScreen extends Component {

    render() {
        const { updateProp, store:{} } = this.props;
        return (
            <View style={styles.container}>
                <Text>saw screen</Text>
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
)(SeenScreen);

const styles = StyleSheet.create({
    container:{

    }
});
