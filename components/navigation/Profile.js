import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from "react-native-image-picker";
import { updateProp } from '../../actions';
import {USER_IMG, USER_NAME} from "../../actions/types";

class Profile extends Component {
    state={
        is_name_updating: false
    };

    chooseFile = () => {
        ImagePicker.showImagePicker({
            title: 'عکس پروفایل خود را انتخاب کنید',
            cancelButtonTitle: 'خروج',
            takePhotoButtonTitle: 'عکس گرفتن...',
            chooseFromLibraryButtonTitle: 'انتخاب از گالری...',
            storageOptions: {
                skipBackup : true
            }
        }, res => {
            if (res.didCancel) {
                console.log("User cancelled");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                console.log("Picker Response:", res);

                this.props.updateProp({ key: USER_IMG, value:  res.uri });
            }
        });
    };

    render() {
        const { updateProp, store:{user_img, user_name, } } = this.props;
        const { is_name_updating  } = this.state;
        return (
            <View
                style={styles.profile}
            >
                <TouchableOpacity
                    style={styles.img_picker}
                    onPress={this.chooseFile}
                >
                    {user_img
                        ?
                        <Image style={styles.img} source={{ uri: user_img }}/>
                        :
                        <Text style={styles.user_name_txt}>{user_name[0]}</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.user_name]}
                >
                    {is_name_updating
                        ?
                        <TextInput
                            autoFocus
                            style={styles.user_name_input}
                            value={user_name}
                            onChangeText={value=>{
                                if(value.length < 9) updateProp({key: USER_NAME, value})
                            }}
                            onSubmitEditing={()=>this.setState({is_name_updating: false})}
                        />
                        :
                        <Text
                            onPress={()=>this.setState({is_name_updating: true})}
                            style={styles.user_name_txt}
                        >
                            {user_name}
                        </Text>
                    }
                </TouchableOpacity>
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
)(Profile);

const styles = StyleSheet.create({
    profile:{
        width: "100%",
        height: 180,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center"
    },
    img_picker:{
        width: 70,
        height: 70,
        marginLeft: 10,
        borderRadius: 140,
        backgroundColor: "#3e82aa",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    user_name_txt:{
        fontSize: 45,
        fontWeight: "600",
        color: "#011f4b"
    },
    img:{
        height: "100%",
        width: "100%",
        borderRadius: 140
    }
});
