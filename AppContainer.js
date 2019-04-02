import React from 'react';
import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation';
import { Dimensions } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import PersonScreen from './screens/PersonScreen';
import WishListScreen from "./screens/WishListScreen";
import SeenScreen from "./screens/SeenScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import ArtistsScreen from "./screens/ArtistsScreen";
import TopScreen from "./screens/TopScreen";
import TrendingScreen from "./screens/TrendingScreen";
import ResultsScreen from "./screens/ResultsScreen";
import TrailerScreen from "./screens/TrailerScreen";

import MenuDrawer from "./components/navigation/MenuDrawer";
import CustomHeader from './components/navigation/CustomHeader';
import HeaderButton from './components/navigation/HeaderButton';
import {toPersian} from "./utils";

const WIDTH = Dimensions.get('window').width;
const DrawerConfig = {
    drawerWidth: 60,
    drawerPosition: "right",
    contentComponent: ({navigation})=>{
        return(<MenuDrawer navigation={navigation}/>)
    },
    edgeWidth: 50-WIDTH,
    drawerBackgroundColor: "transparent"
};

const options = (title)=>({
    header: props => <CustomHeader {...props} title={title}/>,
    headerStyle: {
        backgroundColor: "transparent"
    }
});

const AppNavigator = createDrawerNavigator(
    {
        Dashboard: createStackNavigator({
            HomeScreen:{
                screen: HomeScreen,
                navigationOptions: ({ navigation })=>({
                    header: props => <CustomHeader {...props} title={"فــــیلم بــــاز"}/>,
                    headerStyle: {
                        backgroundColor: "transparent"
                    },
                    headerTintColor: "#fff",
                    headerLeft: <HeaderButton {...navigation}/>
                })
            },
            FavoriteScreen:{
                screen: FavoriteScreen,
                navigationOptions: options("مورد علاقه")
            },
            WishListScreen:{
                screen: WishListScreen,
                navigationOptions: options("در انتظار دیدن")
            },
            SeenScreen:{
                screen: SeenScreen,
                navigationOptions: options("دیده شده")
            },
            ResultsScreen:{
                screen: ResultsScreen,
                navigationOptions: options("نتایج جست و جو")
            },
            TopScreen:{
                screen: TopScreen,
                navigationOptions: options(toPersian("برتریــن ها"))
            },
            TrendingScreen:{
                screen: TrendingScreen,
                navigationOptions: options("تـرنــد")
            },
            ArtistsScreen:{
                screen: ArtistsScreen,
                navigationOptions: options("هنرمندان")
            },
            MovieScreen:{
                screen: MovieScreen,
                navigationOptions: options(false)
            },
            PersonScreen:{
                screen: PersonScreen,
                navigationOptions: options(false)
            },
            TrailerScreen:{
                screen: TrailerScreen,
                navigationOptions: {
                    header: null
                }
            },
        })
    },
    DrawerConfig
);

export default createAppContainer(AppNavigator);