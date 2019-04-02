import React from 'react';
import { View } from 'react-native';
import {correct_date, toPersian} from "../../utils";
import KeyVal from './KeyVal';
import KnownFor from './KnownFor';

export default ({item:{
   gender,
   known_for_department,
   also_known_as,
   birthday,
   place_of_birth,
   deathday,
   biography
}})=>{
    return (
        <View>
            <KeyVal keyy={"جنسیت"} val={
                (gender === 1)
                    ?
                    "زن"
                    :
                    "مرد"
            }
            />
            <KeyVal keyy={"رشته ی کاری"} val={known_for_department}
            />
            <KnownFor
                full_mode
                keyy={"اثر برجسته"}
                val={also_known_as}
                onPress={id => this.handleLink(id, "movie")}
            />
            <KeyVal keyy={"تولد"} val={toPersian(correct_date(birthday))}/>
            <KeyVal keyy={"محل تولد"} val={place_of_birth}/>
            <KeyVal keyy={"تاریخ فوت"} val={deathday}/>
            <KeyVal keyy={"بیوگرافی"} val={biography} no_border/>
        </View>
    );
};