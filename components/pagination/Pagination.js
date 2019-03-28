import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Pagination = ({pages, page, moveTo, what_is_pressed})=>{
    const can_go_back = page-1 > 0;
    const can_go_forward = page+1 <= pages;
    return (
        <LinearGradient
            style={styles.container}
            colors={["#43cea2","#185a9d"]}
            pointerEvents={what_is_pressed > 1 ? "none" : "auto"}
        >

            <TouchableOpacity
                style={[styles.block, {width: 30}]}
                disabled={!can_go_forward}
                onPress={()=>{
                    if(can_go_forward) moveTo(page+1)
                }}
            >
                {(what_is_pressed === page+1)
                    ?
                    <ActivityIndicator color={"#fff"}/>
                    :
                    <Ionicons size={33} color={"#ffffff"} name={"ios-arrow-forward"}/>
                }
            </TouchableOpacity>

            {(pages > page && page+5 !== pages) &&(
                <TouchableOpacity
                    style={styles.block}
                    onPress={()=>moveTo(pages)}
                >
                    {(what_is_pressed === pages)
                        ?
                        <ActivityIndicator color={"#fff"}/>
                        :
                        <Text style={styles.txt}>{pages}</Text>
                    }
                </TouchableOpacity>
            )}

            {(page+5 <= pages) &&(
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                        style={styles.block}
                        onPress={()=>moveTo(page+5)}
                    >
                        {(what_is_pressed === page+5)
                            ?
                            <ActivityIndicator color={"#fff"}/>
                            :
                            <Text style={styles.txt}>{page+5}</Text>
                        }
                    </TouchableOpacity>
                    <Text style={styles.dots}>...</Text>
                </View>
            )}

            <TouchableOpacity
                style={[styles.block, styles.active_block]}
                disabled
            >
                <Text style={[styles.txt, styles.active_txt]}>{page}</Text>
            </TouchableOpacity>

            {(page-5 > 0) &&(
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.dots}>...</Text>
                    <TouchableOpacity
                        style={styles.block}
                        onPress={()=>moveTo(page-5)}
                    >
                        {(what_is_pressed === page-5)
                            ?
                            <ActivityIndicator color={"#fff"}/>
                            :
                            <Text style={styles.txt}>{page-5}</Text>
                        }
                    </TouchableOpacity>
                </View>
            )}

            {(page > 1  && page-5 !== 1) &&(
                <TouchableOpacity
                    style={styles.block}
                    onPress={()=>moveTo(1)}
                >
                    {(what_is_pressed === 1)
                        ?
                        <ActivityIndicator color={"#fff"}/>
                        :
                        <Text style={styles.txt}>{1}</Text>
                    }
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.block, {width: 30}]}
                disabled={!can_go_back}
                onPress={()=>{
                    if(can_go_back) moveTo(page-1)
                }}
            >
                {(what_is_pressed === page-1)
                    ?
                    <ActivityIndicator color={"#fff"}/>
                    :
                    <Ionicons size={33} color={"#ffffff"} name={"ios-arrow-back"}/>
                }
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        backgroundColor: "#fff",
        // width: "60%",
        height: 40,
        paddingHorizontal: 10,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden"
    },
    block:{
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#051e3e",
        marginHorizontal: 3,
        paddingHorizontal: 3
    },
    active_block:{
        backgroundColor: "#051e3e"
    },
    dots:{
        textAlignVertical: "bottom",
        fontSize: 18
    },
    txt:{
        fontSize: 23,
        fontWeight: "600",
        color: "#ffffff"
    }
});
