import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateProp } from '../actions';


class PersonScreen extends Component {

    render() {
        const { updateProp, store:{ current_person } } = this.props;
        console.log("current_person: ", current_person);
        return (
            <View style={styles.container}>
                <Text>Artist</Text>
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
)(PersonScreen);

const styles = StyleSheet.create({
    container:{

    }
});
