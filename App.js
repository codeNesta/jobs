import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import {useScreens} from 'react-native-screens'
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'

import NavigationContainer from './navigation/NavigationContainer';

import authReducer from './store/reducers/auth';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'

import * as Font from 'expo-font';

import {AppLoading} from 'expo'

const rootReducer = combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer,
  auth:authReducer
})


useScreens()

const store = createStore(rootReducer,applyMiddleware(ReduxThunk),composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),

  })
}

export default function App() {



const [fontLoaded, setFontLoaded] = useState(false);

if(!fontLoaded){

        return <AppLoading startAsync={fetchFonts} onFinish={() => {
          setFontLoaded(true)
        }}/>  
}



  return (
    <Provider store={store}>
        <NavigationContainer/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
