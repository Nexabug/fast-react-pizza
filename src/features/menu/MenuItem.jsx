import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux'
import { additems, decrease, deletitem, increase } from "../cart/cartSlice";
// import {useSelector} from 'react-redux'

function MenuItem({ pizza }) {
  const dispatch = useDispatch()
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector(state => state.cart.cart);
  const cartitems = cart.find(item => item.pizzaId === id);
  const noofpizza = cartitems?.quantity || 0;



  console.log(noofpizza)
  function handeladditem() {
    const newitems = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }
    dispatch(additems(newitems))

  }

  function handelincrease() {
    dispatch(increase(id))
  }
  function handeldecrease() {
    dispatch(decrease(id))
  }
  return (
    <li className="border-b">
      <div className="flex items-center mt-4 pb-5 gap-6 ">
        <img src={imageUrl} alt={name} className={soldOut ? 'grayscale rounded-[20px]' : 'rounded-[20px]'} />
        <div>
          <p>{name}</p>
          <p>{ingredients.join(', ')}</p>
          <div className={!soldOut ? "bg-green-400 p-2 rounded-md flex justify-center mt-3" : 'p-2 mt-3 rounded-md flex justify-center bg-red-500'}>
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          </div>
        </div>
      </div>
      {!cartitems ? (
        <div className=" justify-center flex space-x-3 mb-3">
          {!soldOut && <Button onClick={handeladditem}> Add Cart</Button>}
        </div>
      ) : (
        <div className="flex space-x-3 w-full justify-center items-center mb-5">
          <button className="bg-yellow-400 rounded-full w-10 h-10" onClick={handeldecrease}>
            -
          </button>
          <p className="text-lg font-semibold">{noofpizza}</p>
          <button className="bg-yellow-400 rounded-full w-10 h-10" onClick={handelincrease}>
            +
          </button>
        </div>
      )}



    </li>
  );
}

export default MenuItem;
