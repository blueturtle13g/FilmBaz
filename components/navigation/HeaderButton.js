import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({openDrawer})=>{
    return(
        <TouchableOpacity
            onPress={openDrawer }
            style={styles.container}
        >
            <MaterialCommunityIcons name={"menu"} color={"#fff"} size={35}/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container:{
        marginLeft: 5
    }
});