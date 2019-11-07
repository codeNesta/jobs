//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator , AsyncStorage} from 'react-native';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth'

// create a component
const StartupScreen = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {

              const userData =await AsyncStorage.getItem('userData');

              if(!userData){
                props.navigation.navigate('Auth')
                   return ;
              }
  
             const transformedData = JSON.parse(userData);
             const {token, userId, expiryDate} = transformedData;

             const expirationDate = new Date(expiryDate);

             if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth')
                  return;
             }

             const expirationTime = expirationDate.getTime() - new Date().getTime();

             props.navigation.navigate('Shop')
             dispatch(authActions.authenticate(userId, token, expirationTime))

        }

        tryLogin()
    },[dispatch])

    return (
        <View style={styles.container}>
           <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default StartupScreen;
