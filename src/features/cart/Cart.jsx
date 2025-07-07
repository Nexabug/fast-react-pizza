import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import CartItem from './CartItem'
import { useSelector , useDispatch } from 'react-redux';
import {clearcart} from './cartSlice'
import EmptyCart from './EmptyCart';
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.cart)
  const cartlenght = cart.length
const username = useSelector(state => state.user.username)
if(cartlenght === 0) return <EmptyCart />

  return (
    
    <div className=' mx-auto mt-4'>
      <Link to="/menu" className='text-blue-400 hover:text-blue-700 active:text-blue-950'>&larr; Back to menu</Link>

      <h2 className='mt-8 text-2xl tracking-widest	font-semibold text-stone-700'>Your cart, {username}</h2>
<ul className='mt-7 tracking-widest	 text-stone-700'>
  {cart.map(x => <CartItem item={x} key={x.name}/>)}
</ul>
      <div className='mt-5 flex justify-between space-x-4'>
        <Button to="/order/new">Order pizzas</Button>
        <Button type='cart' onClick={() => dispatch(clearcart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
