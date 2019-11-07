import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = "SET_PRODUCTS";




export const fetchProducts = () => {

      
        return async (dispatch, getState) => {

            const userId = getState().auth.userId;
           
            try{


            const response = await fetch('https://mytry-bea8d.firebaseio.com/products.json')

            if(!response.ok){
                throw new Error('something  went wrong')
            }
            
            const resData = await response.json();

            const loadedProducts = [];

            for(const key in resData) {
                loadedProducts.push(new Product(
                                                key, 
                                                userId, 
                                                resData[key].title,
                                                resData[key].imageUrl,
                                                resData[key].description,
                                                resData[key].price
                                            )
                                    )
            }

            dispatch({type:SET_PRODUCTS, products:loadedProducts, userProducts:loadedProducts.filter(prod => prod.ownerId === userId )})
       
       }catch(err){

        //send to custom analytics sever
          throw err;
       }
    }
        
}







export const deleteProduct = productId => {
    return async (dispatch, getState) =>{

        const token = getState().auth.token;

     const response =  await fetch(`https://mytry-bea8d.firebaseio.com/products/${productId}.json?auth=${token}`,{
            method:"DELETE",
})

                        dispatch({
                            type:DELETE_PRODUCT,
                            pid:productId
                        })

                        if (!response.ok){
                            throw new Error('something wen wrong')
                        }
    }
}






export const createProduct = (title, description, imageUrl, price) => {
   return async (dispatch, getState) => {

    const token = getState().auth.token;

    const userId = getState().auth.userId;
                    


    const response = await fetch(`https://mytry-bea8d.firebaseio.com/products.json?auth=${token}`,{
                                    method:"POST",
                                    header:{
                                        'Content-Type':'application/json'
                                    },
                                    body:JSON.stringify({
                                                            title,
                                                            description,
                                                            imageUrl,
                                                            price,
                                                            ownerId:userId
                                                        })
     })


     if(!response.ok){
        throw new Error('something wen wrong')
    }

        const resData = await response.json()

        console.log(resData)

                        dispatch({
                            type:CREATE_PRODUCT,
                            productData:{
                                            id:resData.name,
                                            title:title,
                                            description:description,
                                            imageUrl:imageUrl,
                                            price:price,
                                            ownerId:userId
                            }
                        })





   }
}


export const updateProduct = (id,title, description, imageUrl) => {

    return async (dispatch, getState) => {

       const token = getState().auth.token;

    const response =    await fetch(`https://mytry-bea8d.firebaseio.com/products/${id}.json?auth=${token}`,{
            method:"PATCH",
            header:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                                    title,
                                    description,
                                    imageUrl,
                                   
                                })
})

if(!response.ok){
    throw new Error('something wen wrong')
}

        dispatch({
                type:UPDATE_PRODUCT,
                pid:id,
                productData:{
                                title:title,
                                description:description,
                                imageUrl:imageUrl,                    
                }
        })

    }
  
}