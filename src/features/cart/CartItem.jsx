import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from 'react-redux'
import { deletitem } from './cartSlice'

function CartItem({ item }) {
  const dispatch = useDispatch()
  const { pizzaId, name, quantity, totalPrice } = item;
  function handeldeleteitem() {
    dispatch(deletitem(pizzaId))
    console.log(pizzaId)
  }

  return (
    <li className=" mt-5 font-sm border-b pb-3 justify-between items-center sm:flex space-x-12">

      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex sm:gap-6 items-center justify-between">
        <p>{formatCurrency(totalPrice)}</p>

        <Button type='delete' onDelete={handeldeleteitem}>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
