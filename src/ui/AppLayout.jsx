import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "../utils/Loader";
import { useSelector } from "react-redux";

function AppLayout() {
  const loader = useNavigation();
  // console.log(loader);
  const isloding = loader.state === "loading";
  const cart = useSelector(state => state.cart.cart)
  const cartlenght = cart.length
  return (
    <div className="layout h-screen grid grid-rows-[auto_1fr_auto]">
      {isloding && <div className="absolute  bg-slate-200/30 inset-0 backdrop-blur-sm flex justify-center items-center"><Loader /></div>
      }

      <Header />
      <main className="mx-auto my-0">
        <Outlet />
      </main>
     {cartlenght === 0?'': <CartOverview />}
    </div>
  );
}

export default AppLayout;
