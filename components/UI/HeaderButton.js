//import liraries
import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons'
import Colors from '../../constants/Colors';


// create a component
const CustomHeaderButton = (props) => {
    return <HeaderButton  {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS === "android" ? 'white' : Colors.primary} />
};

//make this component available to the app
export default CustomHeaderButton;
