import React from 'react';
import {
    View,
    StyleSheet ,
    TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export default ({show_more, toggle})=>{
    return (
        <View style={styles.show_more_con}>
            <TouchableOpacity
                style={styles.show_more}
                onPress={toggle}
            >
                <Animatable.View
                    iterationCount="infinite"
                    easing={"ease-out"}
                    animation="swing"
                    direction="alternate"
                >
                    <MaterialCommunityIcons
                        color={"#83d0c9"}
                        name={show_more ? "arrow-up-circle" : "arrow-down-circle"}
                        size={45}
                    />
                </Animatable.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    show_more_con:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: -20,
    },
    show_more:{
        backgroundColor: "#2b2b2b",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    }
});
