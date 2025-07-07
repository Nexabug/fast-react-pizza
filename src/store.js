import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../userSlice'
// import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './features/cart/cartSlice'

const store = configureStore ({
    reducer:{
        user : userReducer,
        cart: cartReducer
    },
    devTools:true
})
export default store