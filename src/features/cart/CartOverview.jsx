import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'


function CartOverview() {
  const totalPrice = useSelector((state) => state.cart.cart.reduce((cur , item) => cur + item.totalPrice , 0))
 const id = useSelector((state) => state.cart.cart.reduce((cur , item) => cur + item.quantity , 0))
 console.log(id)
  return (
    <div className="flex justify-between bg-stone-800 text-stone-100 p-4 fixed bottom-0 , left-0 w-full z-50">
      <p className="space-x-4">
        <span>{id} Pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
