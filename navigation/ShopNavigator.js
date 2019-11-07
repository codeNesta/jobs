import {createStackNavigator } from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {Platform, SafeAreaView , Button, View} from 'react-native';
import React from 'react'
import { useDispatch} from 'react-redux';

import AuthScreen from '../screens/user/AuthScreen';
import CartScreen from '../screens/shop/CartScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/Colors';
import OrdersScreen from '../screens/shop/OrdersScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import StartupScreen from '../screens/StartupScreen';
import { Ionicons } from '@expo/vector-icons';
import * as authActions from '../store/actions/auth';

const ProductsNavigator = createStackNavigator({
  ProductsOverview: {
      screen:ProductsOverviewScreen
  },

  ProductDetail:{
      screen:ProductDetailScreen
  },
  Cart:{
      screen:CartScreen
  }

  
},{
    initialRouteName:'ProductsOverview',
    navigationOptions:{
        drawerIcon:drawerConfig => <Ionicons name={Platform.OS === "android" ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
      },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Colors.primary
        },
      
       
        headerTintColor: 'white' 
    }
})

const OrdersNavigator = createStackNavigator({
Orders:{
    screen:OrdersScreen
}
},{
    navigationOptions:{
      drawerIcon:drawerConfig => <Ionicons name={Platform.OS === "android" ? 'md-list' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Colors.primary
        },
      
       
        headerTintColor: 'white' 
    }
})




const AdminNavigator = createStackNavigator({
    UserProducts:{
             screen : UserProductsScreen,
    },
    EditProduct : {
              screen:EditProductScreen
    }
    },{
        navigationOptions:{
          drawerIcon:drawerConfig => <Ionicons name={Platform.OS === "android" ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
        },
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor: Colors.primary
            },
          
           
            headerTintColor: 'white' 
        }
    })
    


const ShopNavigator = createDrawerNavigator({
    Products:ProductsNavigator,
    Orders:OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor: Colors.primary
    },
    contentComponent:props => {
        const dispatch = useDispatch()
        return <View style={{flex:1, paddingTop:20}}>
                    <SafeAreaView forceInset={{top:'always', horizontal:'never'}} >
                        <DrawerItems {...props} />
                        <Button title="logout" color={Colors.primary} onPress={() => {
                            dispatch(authActions.logout());
                            // props.navigation.navigate('Auth')
                         }} />
                    </SafeAreaView>
               </View>
    }
})

const AuthNavigator = createStackNavigator({
    Auth:AuthScreen,
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Colors.primary
        },
      
       
        headerTintColor: 'white' 
    }
})

const MainNavigator = createSwitchNavigator({
    Startup:StartupScreen,
    Auth:AuthNavigator,
    Shop:ShopNavigator
})



export default createAppContainer(MainNavigator)