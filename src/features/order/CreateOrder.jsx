// import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import Order from "./Order";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from "../../../userSlice";

//https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    st);

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const dispatch = useDispatch()
  const [withPriority, setWithPriority] = useState(false);
  const username = useSelector(state => state.user.username)
  const addres = useSelector(state => state.user.address);

  console.log(addres)
  const position = useSelector(state => state.user.position)
  const cart = useSelector(state => state.cart.cart);
  const status = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);
  const totalPrice = useSelector((state) => state.cart.cart.reduce((cur, item) => cur + item.totalPrice, 0))
  const priority = withPriority ? totalPrice * .2 : 0
  const sumprice = priority + totalPrice
  const navigation = useNavigation()
  const isSubmiting = navigation.state === 'submitting'
  return (
    <div className="max-w-[750px] my-4 px-6 mx-auto flex flex-col gap-10">
      <h2 className="font-[600] text-stone-700 tracking-widest text-xl">Ready to order? Lets go!</h2>
      <Form method="POST" className="flex flex-col gap-5  text-yellow-500">
        <div className="flex justify-between items-center">
          <label className="mr-1 tracking-wide font-[300] text-[20px]  text-stone-500">First Name</label>
          <input type="text" className="input  text-yellow-500" name="customer" defaultValue={username} required />
        </div>

        <div className="flex justify-between items-center">
          <label className="mr-1 tracking-wide font-[300] text-[20px]  text-stone-500">Phone number</label>
          <div>
            <input className="input  text-yellow-500" type="tel" name="phone" required />

          </div>
        </div>

        <div className="flex justify-between items-center ">
          <label className="mr-1 tracking-wide font-[300] text-[20px]  text-stone-500">Address</label>
          <div className="relative ">
            <input
              className="input text-[20px]  text-yellow-500" defaultValue={addres}
              type="text" name="address" required />
            <span className="absolute right-0  scale-100 top-[3.5px]">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {status === 'loading' ? 'Getting...' : 'Get Position'}
              </Button>
            </span>
            {status === 'error' && <p className="text-red-500 text-sm">{error}</p>}

          </div>
        </div>

        <div className="flex gap-4">
          <input
            className="focus:ring text-yellow-500 focus:outline-none focus:ring-offset-2 focus:offset-0 focus:border-none focus:ring-yellow-400
          accent-yellow-400 w-6 h-6 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="tracking-wide font-[300] text-[20px]  text-stone-500" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {" "}
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude} , ${position.longitude}` : ''} />
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button>{isSubmiting ? 'Order is in process' : `Order now ` + formatCurrency(sumprice)}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    // position: JSON.parse(data.position),
    priority: data.priority === "true",
  };
  console.log(order);

  const neworder = await createOrder(order);
  console.log(neworder);
  return redirect(`/order/${neworder.id}`);
}





export default CreateOrder;



