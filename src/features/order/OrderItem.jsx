import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="border-t">
      <div className="flex justify-between pt-3">
        <p className='font-[500] tracking-wider'>
          <span className="font-[600] text-xl text-stone-700">{quantity}&times;</span> {name}
        </p>
        <p className="font-[600] text-xl text-stone-700">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
