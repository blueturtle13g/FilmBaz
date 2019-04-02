import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import ResultItem from '../components/item/ResultItem';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

class SeenScreen extends Component {

    render() {
        const { store:{ seen_movies }, navigation:{navigate} } = this.props;
        return (
            <LinearGradient
                colors={["#d3cce3","#e9e4f0"]}
                style={styles.container}
            >
                {!seen_movies.length &&(
                    <Animatable.Text
                        animation="flipInX"
                        iterationCount={1}
                        style={styles.no_item}>
                        هیچ موردی ثبت نشده است.
                    </Animatable.Text>
                )}
                <FlatList
                    data={seen_movies}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={item=><ResultItem
                        item={item}
                        navigate={navigate}
                    />}
                />
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
    mapStateToProps
)(SeenScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    no_item:{
    color: "#2b2b2b",
        fontSize: 21,
        textAlign: "center",
        marginTop: 10
}
});
