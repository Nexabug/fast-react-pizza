import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    cart:[]
}
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        additems(state , action){
            state.cart.push(action.payload)
        },
        deletitem(state , action){
            state.cart = state.cart.filter(x=> x.pizzaId !== action.payload)
        },
        increase(state , action){
            const item = state.cart.find(x => x.pizzaId === action.payload)
            item.quantity = item.quantity +1 ;
            item.totalPrice = item.unitPrice * item.quantity
           
        },
        decrease(state , action){
            const item = state.cart.find(x => x.id === action.payload)
            item.quantity--;
            item.totalPrice = item.unitPrice * item.quantity
           
        },
        clearcart(state ){
            state.cart=[]
        },

    }
})

export const {decrease , increase , clearcart , additems , deletitem} = cartSlice.actions

export default cartSlice.reducer;
