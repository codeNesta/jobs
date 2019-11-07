//import liraries
import React, { useEffect, } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart'

// create a component
const ProductDetailScreen = (props) => {

    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

    const dispatch = useDispatch();

    // useEffect(() => {
      
    // }, [])

    return (
       <ScrollView>
             <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
             <View style={styles.actions}>
                  <Button   color={Colors.primary} 
                            title="Add to Cart" 
                            onPress={() => {
                                             dispatch(cartActions.addToCart(selectedProduct))
                  }} />
             </View>
             <Text style={styles.price} >${selectedProduct.price.toFixed(2)}</Text>
             <Text style={styles.description} >{selectedProduct.description}</Text>
       </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}



// define your styles
const styles = StyleSheet.create({
    actions:{
          marginVertical:10,
          alignItems:'center'

    },
   image:{
       width:'100%',
       height:300,

   },
   price:{
       fontSize:20,
       color:'#888',
       textAlign:'center',
       marginVertical:20,
       fontFamily:'open-sans-bold',
   },
   description:{
    fontFamily:'open-sans',
    fontSize:14,
    textAlign:'center',
    marginHorizontal:20
   }
});

//make this component available to the app
export default ProductDetailScreen;
