//import liraries
import React, {useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation'

// create a component
const NavigationContainer = () => {

    const navRef = useRef();

    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if(!isAuth){
                  navRef.current.dispatch(NavigationActions.navigate({routeName:'Auth'})) 
        }
    },[isAuth])

    return (
       <ShopNavigator ref={navRef}/>
    );
};

//make this component available to the app
export default NavigationContainer;
