import React,{useEffect,useCallback, useState} from 'react';
import {FlatList,View, Platform, Button, ActivityIndicator, StyleSheet, Text,} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'

import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

import ProductItem from '../../components/shop/ProductItem';
import Colors from  '../../constants/Colors';


const ProductsOverviewScreen = (props)=> {

    const [isLoading, setIsLoading]  = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] =  useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

const loadProducts =useCallback( async ()=> {

    console.log('load productsss')

        setError(null)
        setIsRefreshing(true)
     
                                try{
                                    await dispatch(productsActions.fetchProducts());
                                }catch(err){
                                setError(err.message)
                                }   
       
      setIsRefreshing(false)
    
},[dispatch, setIsLoading, setError])



useEffect(() => {
  
   const willFocusSub =  props.navigation.addListener('willFocus',loadProducts);

    return () => {
        willFocusSub.remove()
    }
   
},[loadProducts])



    useEffect(() => {
        setIsLoading(true)
                      loadProducts().then(() => {
                        setIsLoading(false)
                      })
    },[dispatch, loadProducts])







    const selectItemHandler = (id, title) => {
        props.navigation.navigate( 'ProductDetail', {
            productId: id, 
         productTitle: title
        })
    }

    if(error){
          return   ( <View style={styles.centered} >
                   <Text>Error Ouccured</Text>
                   <Button title="try again" onPress={loadProducts} color={Colors.primary} />
               </View>)
    }

    if(isLoading){
        return  <View style={styles.centered} >
                    <ActivityIndicator size="large" color={Colors.primary} />
               </View>
    }

    
    if(!isLoading  && products.length === 0){
        return  <View style={styles.centered} >
                   <Text>No Prooducts found. may be start adding some</Text>
               </View>
    }

    return(
       <View>
         
            <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing}
        data={products} 
        keyExtractor={item => item.id} 
        renderItem={itemData => <ProductItem 
                                            title={itemData.item.title} 
                                            price={itemData.item.price} 
                                            image={itemData.item.imageUrl}
                                            onSelect={() => {
                                                 selectItemHandler(itemData.item.id, itemData.item.title)
                                            }}  >
                                    <Button 
                                            color={Colors.primary} 
                                            title="View Details" 
                                            onPress={() => {  selectItemHandler(itemData.item.id, itemData.item.title) }} />
                                    <Button 
                                            color={Colors.primary} 
                                            title="To Cart" 
                                            onPress={() =>dispatch(cartActions.addToCart(itemData.item)) } />
                                </ProductItem>
                                                } />
       </View>
    )
      
        
}

ProductsOverviewScreen.navigationOptions = navData => {

    return {
        headerTitle:'All Products',
        headerLeft:<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
                title="Menu" 
                iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'} 
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />   
</HeaderButtons> ,
        headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                    title="Cart" 
                                    iconName={Platform.OS === "android" ? 'md-cart' : 'ios-cart'} 
                                    onPress={() => {
                                        navData.navigation.navigate('Cart')  
                                    }} />   
                    </HeaderButtons>
        
    }

}

const styles = StyleSheet.create({
    centered:{
        flex:1, justifyContent: 'center', alignItems:'center'
    }
})


export default ProductsOverviewScreen



