import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { toPersian } from "../utils";

class Block extends Component {

    render() {
        const {
            onPress,
            store:{ correct_day, correct_month, current_month},
            title
        } = this.props;
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[
                    styles.container,
                    (correct_month === title || (correct_day === title && current_month === correct_month))
                    &&{backgroundColor: "#2fc988"}
                ]}
            >
                <Text style={styles.title}>{toPersian(title)}</Text>
            </TouchableOpacity>
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
)(Block);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
        elevation: 5
    },
    title:{
        fontSize: 22,
        color: "#fff"
    }
});
