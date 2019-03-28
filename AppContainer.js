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
import ArticlesScreen from "./screens/ArticlesScreen";
import TopScreen from "./screens/TopScreen";
import FestivalsScreen from "./screens/FestivalsScreen";
import ResultsScreen from "./screens/ResultsScreen";

import MenuDrawer from "./components/navigation/MenuDrawer";
import CustomHeader from './components/navigation/CustomHeader';
import HeaderButton from './components/navigation/HeaderButton';
import {toPersian} from "./utils";

const w = Dimensions.get('window');
const DrawerConfig = {
    drawerWidth: w.width*.83,
    drawerPosition: "right",
    contentComponent: ({navigation})=>{
        return(<MenuDrawer navigation={navigation}/>)
    }
};

const options = (title)=>({
    header: props => <CustomHeader {...props} title={title}/>,
    headerStyle: {
        backgroundColor: "transparent"
    },
    headerTintColor: "#fff"
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
                navigationOptions: options("نتایج جستوجو")
            },
            TopScreen:{
                screen: TopScreen,
                navigationOptions: options(toPersian("250 فیلم برتر"))
            },
            FestivalsScreen:{
                screen: FestivalsScreen,
                navigationOptions: options("جشنواره ها")
            },
            ArticlesScreen:{
                screen: ArticlesScreen,
                navigationOptions: options("مقالات")
            },
            MovieScreen:{
                screen: MovieScreen,
                navigationOptions: options(false)
            },
            PersonScreen:{
                screen: PersonScreen,
                navigationOptions: options(false)
            },
        })
    },
    DrawerConfig
);

export default createAppContainer(AppNavigator);