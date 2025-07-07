// Test ID: IIDSAT
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { clearcart } from "../cart/cartSlice";
import OrderItem from './OrderItem'
import store from '../../store'



function Order() {
  const order = useLoaderData();
  console.log(order);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-4 px-3 space-y-12">
      <div className="flex justify-between">
        <h2 className="text-xl tracking-wider font-medium ">Order #{id} Status</h2>

        <div  className="text-xl tracking-wider space-x-2">
          {priority && <span className="bg-red-600 rounded-full px-2 py-1 text-stone-100">Priority</span>}
          <span className="bg-green-500 rounded-full px-2 py-1 text-stone-100">{status} order</span>
        </div>
      </div>

      <div className="flex justify-between bg-stone-300 px-4 py-6 font-[700] text-stone-700 text-[17px]">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <div>
        <ul className="border-b space-y-4">
          {cart.map(x => <OrderItem item={x} key={x.pizzaId} />)}
        </ul>
      </div>

      <div className="border-t text-stone-600 font-[500] bg-stone-300 px-4 py-6 justify-between ">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className=" font-[700] text-stone-700 text-[17px]">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = getOrder(params.orderId);
  store.dispatch(clearcart())
  return order;
}

export default Order;
