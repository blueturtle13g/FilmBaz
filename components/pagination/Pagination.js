import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Block from './Block';

export default  ({pages, page, moveTo, what_is_pressed})=>{
    const can_go_back = page-1 > 0;
    const can_go_forward = page+1 <= pages;
    return (
        <View
            style={styles.container}
            pointerEvents={what_is_pressed > 1 ? "none" : "auto"}
        >

            <Block
                moveTo={moveTo}
                page={page+1}
                in_progress={what_is_pressed === page+1}
                disabled={!can_go_forward}
                forward
            />

            {(pages > page && page+5 !== pages) &&(
                <Block
                    moveTo={moveTo}
                    page={pages}
                    in_progress={what_is_pressed === pages}
                />
            )}

            {(page+5 <= pages) &&(
                <View style={{flexDirection: "row"}}>
                    <Block
                        moveTo={moveTo}
                        page={page+5}
                        in_progress={what_is_pressed === page+5}
                    />
                    <Text style={styles.dots}>...</Text>
                </View>
            )}

            <Block
                moveTo={moveTo}
                page={page}
                in_progress={what_is_pressed === page}
                desabled
                active
            />

            {(page-5 > 0) &&(
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.dots}>...</Text>
                    <Block
                        moveTo={moveTo}
                        page={page-5}
                        in_progress={what_is_pressed === page-5}
                    />
                </View>
            )}

            {(page > 1  && page-5 !== 1) &&(
                <Block
                    moveTo={moveTo}
                    page={1}
                    in_progress={what_is_pressed === 1}
                />
            )}

            <Block
                moveTo={moveTo}
                page={page-1}
                in_progress={what_is_pressed === page-1}
                disabled={!can_go_back}
                back
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        alignSelf: "center",
        backgroundColor: "#009688",
        height: 40,
        paddingHorizontal: 7,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden",
    },
    dots:{
        textAlignVertical: "bottom",
        fontSize: 18
    },
});
