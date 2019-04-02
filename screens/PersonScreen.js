import React  from 'react';
import {ScrollView} from 'react-native';
import { connect } from 'react-redux';
import Item from '../components/item/Item';

const PersonScreen = props=>{
    return (
        <ScrollView>
            <Item item={props.store.current_person}/>
        </ScrollView>
    );
};

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps
)(PersonScreen);