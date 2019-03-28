import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../actions';

class FestivalsScreen extends Component {
    render() {
        const { updateProp, store:{} } = this.props;
        return (
            <View style={styles.container}>
                <Text>FestivalsScreen</Text>
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
)(FestivalsScreen);

const styles = StyleSheet.create({
    container:{

    }
});
