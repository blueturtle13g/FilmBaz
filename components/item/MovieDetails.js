import React from 'react';
import { View } from 'react-native';
import {correct_date, toPersian} from "../../utils";
import KeyVal from './KeyVal';

export default ({item:{
    media_type,
    vote_count,
    first_air_date,
    release_date,
    original_language,
    vote_average,
    tagline,
    created_by,
    origin_country,
    budget,
    revenue,
    adult,
    genres,
    status,
    seasons,
    production_companies,
    overview,
    number_of_episodes,
    number_of_seasons,
    networks,
}, show_more, is_tv})=>{
    return (
        <View>
            <KeyVal keyy={"نوع"} val={media_type}/>
            <KeyVal keyy={"تعداد رای"} val={toPersian(vote_count)}/>
            <KeyVal keyy={"امتیاز"} val={toPersian(vote_average)}/>
            <KeyVal keyy={"تاریخ انتشار"} val={toPersian(correct_date(first_air_date || release_date))}/>
            <KeyVal keyy={"زبان"} val={original_language}/>
            <KeyVal keyy={"تگ"} val={tagline}/>
            {!!created_by &&(
                <KeyVal keyy={"ساخته شده توسط"} val={created_by} multiple_val with_object/>
            )}
            {!!genres &&(
                <KeyVal keyy={"ژانر"} val={genres} multiple_val with_object no_border={!show_more}/>
            )}
            {show_more &&(
                <View>
                    {!!seasons &&(
                        <KeyVal keyy={"فصل ها"} val={seasons} multiple_val with_object/>
                    )}
                    {!!production_companies &&(
                        <KeyVal keyy={"شرکت های تولید کننده"} val={production_companies} multiple_val with_object/>
                    )}
                    {!!networks &&(
                        <KeyVal keyy={"شبکه ها"} val={networks} multiple_val with_object/>
                    )}
                    {!!origin_country &&(
                        <KeyVal keyy={"کشور های تولید کننده"} val={origin_country} multiple_val/>
                    )}
                    <KeyVal keyy={"بودجه"} val={
                        !!budget
                            ?
                            toPersian(budget.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                            :
                            ""
                    }
                    />
                    <KeyVal keyy={"سود"} val={
                        !!revenue
                            ?
                            toPersian(revenue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                            :
                            ""
                    }
                    />
                    <KeyVal keyy={"فیلم بزرگسالان"} val={adult ? " بله" : "خیر" } />
                    <KeyVal keyy={"وضعیت"} val={status} />
                    {is_tv &&(
                        <View>
                            <KeyVal keyy={"تعداد قسمت ها"} val={toPersian(number_of_episodes)} />
                            <KeyVal keyy={"تعداد فصل ها"} val={toPersian(number_of_seasons)} />
                        </View>
                    )}
                    <KeyVal keyy={"خلاصه"} val={overview} no_border/>
                </View>
            )}
        </View>
    );
};