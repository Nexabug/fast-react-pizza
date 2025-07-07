import { createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuloader } from "./features/menu/Menu";
import Error from "./ui/Error";
import Order, { loader as orderloader } from "./features/order/Order";
import CreateOrder, {
  action as createorderaction,
} from "./features/order/CreateOrder";
import Cart from "./features/cart/Cart";
import { RouterProvider } from "react-router";
import AppLayout from "./ui/AppLayout";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuloader,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        errorElement: <Error />,
        action: createorderaction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderloader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
