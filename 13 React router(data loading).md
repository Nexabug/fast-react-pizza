# application planning

1. sabse pahle hame application ke requirement and feactures ko sochna and think karna chahiye
2. fir appliction ko pages me divide karna chahiye
   - think about overall and page-level ui
   - fir uske ui ko desired components me todo
   - then sabhi pages ke liye hame static version bana lena chahiye
3. then sabhi features ko catogery me rakhna chahiye
   - think about state-mangement and data flow
4. decide karo ki kon sa libaries use karna hai

# The steps on details

Using the application built in the section a online pizza order service as an example, we are going to break in the steps mentioned above, so it should help to make easier to understand what each step means.

## Gathering the application requirements (step 1):

This processes consists in colleting the "clients" needs on the aaplication. On our example, our client requested that:

- The application to be very simple - the users can order one or more pizzas from a menu
- The applicatio does not require any user accounts or login - the users simply put their names before using the app
- The pizza menu can be change, so it should be loaded from an API (which on this case was already done)
- Users can add multiple pizzas to a cart before ordering
- Ordering requires only the user's name, phone number and address
- If possible, GPS location should be provided, to make delivery easier
- User's can mark their order as "priority" for an additional 20% of the cart price
- Orders are made by sending a POST request with the order data (user data + selected pizzas) to the API
- Paymentas are made only on delivery, so no payment processing is necessary in the APP
- Each order will get a unique ID that should be displayed, so the user can later look up their order based on that ID
- Users should be able to mark their order as "priority" even after the order has been placed
- From those requirements, even though it's not possible to simply build the accplication, it's possible to think about the necessary features and pages needed by this application.

## Dividing the application and pages and features (steps 2 and 3):

After gathering all the information from the (virtual client), it's time to start thinking on how the application will be organized/divided. From the list of requirements desided by the client, it's possible to organize the application in the set of features below.

- Feature categories

  - User
  - Menu
  - Cart
  - Order
    > Note that all features in the application can be place in one of those derived features from the information gathered above, because this is in essense what the application will be about.

- Necessary pages

  - Home page (/)
  - Pizza menu Page (/menu)
  - Cart Page (/cart)
  - Placing a new order page (/order/new)
  - Looking up an order page (/order/:orderID)

When we compare the features categories and the list of necessary pages, we can see how the categories helps us to define which pages we need on our application. That is so, because:

<table role="table">
<thead>
<tr>
<th>Feature</th>
<th>Page</th>
</tr>
</thead>
<tbody>
<tr>
<td>User</td>
<td>Homepage (the user will enter their infomation here)</td>
</tr>
<tr>
<td>Menu</td>
<td>Pizza menu</td>
</tr>
<tr>
<td>Cart</td>
<td>Cart page</td>
</tr>
<tr>
<td>Order</td>
<td>Placing an order<br>Looking up an order</td>
</tr>
</tbody>
</table>

## State management (step 3 - continued):

When we look at the features categories, we can clearly see that they match pretty well with the concept of "state domains" or "state slices". So, basically - in this example, there is a global state, and one slice is the User, the other is the Menu and so on.

But the way the state management will be applied on the application will depend on how we classify each one of the possible "slices" of state.

In this case, the best type classification for the states can be:

1. User: global UI state (no accounts, so it stays in the application, but it needs to be accessed by other parts of the application)
2. Menu: global remote state (the menu is going to be fetched from an API)
3. Cart: global UI state (the api doesn't need the cart, so it's stored simply in the application)
4. Order: global remote state (the order will be posted to the API)

So basically, the Menu and the Order are remote states, because they "live" inside a API server, while the other two states are UI states, because there no need to pass them to the world outside the application.

> Being able to dicern the types of states help us to chose the libraries/technologies which are going to be used during the development of the application. Also remember ths in real life most of the time these decisions are not taken easly during this stage, but mostly when the aplication is already being created.

## Taking the Technical decisions (step 4):

Based on all the information gathered from the previous steps, it's time to decide which technologies will be used to build the application. We can organize them into "categories" and for this specific case we can use:

<table role="table">
<thead>
<tr>
<th>Category</th>
<th>Technology</th>
<th>Reason</th>
</tr>
</thead>
<tbody>
<tr>
<td>Routing</td>
<td>React Router</td>
<td>Standard for React SPAs</td>
</tr>
<tr>
<td>Styling</td>
<td>tailwindcss</td>
<td>Trendy way of styling applications</td>
</tr>
<tr>
<td>Remote State Management</td>
<td>React Router</td>
<td>New way of fetching data inside <strong>React Router</strong> - by using the "render-as-you-fetch" approach<br><br> <strong>NOTE</strong>:This is not really a state management state strategy as it does not persist state on the application</td>
</tr>
<tr>
<td>UI State Management</td>
<td>Redux</td>
<td>State is fairly complex, giving <strong>Redux</strong> a bit of advantage in this particular case</td>
</tr>
</tbody>
</table>

# New way to implement routing

to ham ab purne tarike ke alwa naye tarike se routing karenge to isse ham data ko featch bhi kar skte hai sath-sath

so first we have to install `react-router-dom@6` from npm

then ek variable me `createBrowserRouter` banyenge and usme object ke andar `path` me us path ko dalenge and `element` me us compontrnt ko dslenge jisko hame dikhna hai jab ham us path pe jaye

and then jab isko hame `App` me lan=gana haai to `RouterProvider` ko return karo and uske prop me router me jis variable me `createBrowserRouter` banya hai usko dal do

now everything will work properly

eg:-

```jsx
import { createBrowserRouter } from "react-router-dom";
// imports of components
import { RouterProvider } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/order/new",
    element: <CreateOrder />,
  },
  {
    path: "/order/:orderId",
    element: <Order />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

to create nested routes ham childern ka use karte hai

```jsx
// some code here

const router = createBrowserRouter([
  {
    element: <Component />,
    children: [
      {
        path: "nested-route/component1/path",
        element: <Component1 />,
      },
      {
        path: "nested-route/component2/path",
        element: <Component2 />,
      },
    ],
  },
]);

// some more coee here
```

and iske childern components ko show karne ke liye hame `Components.jsx` me jakar `<Outlet />` lagana padega

```jsx
// file Component.jsx
import { Outlet } from "react-router-dom";

function Component() {
  return <Outlet />;
}

export default Component;
```

jab ham nest karte hai using react router tho jab ham parent ko koi path nhi dete usko ham `layout route` kahte hai

means componentes jo hai parent ka wo hamesa rahega bas uske children change hote rahenge

# loaders

tp loadeer ek react router ka concept hai jisse ham data ko fetch kar skte while loading the site both same at the time

so isko karne ke liye ham

- sabse pahle to api se data lete hai
  ```jsx
  export async function loader() {
    const menu = await getMenu();
    return menu;
  }
  ```
- then hame jis path me isko chaiye waha pe `loader` bula kar isko dal do

  ```jsx
  // some more imports
  import Menu, { loader as menuloader } from "./features/menu/Menu";

  // some more paths

  { path: "/menu",
    element: <Menu />,
    loader: menuloader,
    }
  ```

  to hamne yaha pe /menu pe usko lagya hai ab hoga yah ki jaise hi ham is path pe gye wo loader check karega hai ya nhi agar hai to usse jo data milega rakh lega then us data ko `<Menu />` me use karne ke liye bas hame menu wale components me ja kar `useLoaderData` me store kar lenge then usko us componenets me lelo jaha apko uski jarurat hai

  ```jsx
  const data = useLoaderData();
  ```

# Error Handling

React Router v6 mein aap errorElement property ka use karke errors ko handle kar sakte hain. Yeh kuch aise kaam karta hai:

Basic Concept:

- Aap apne router definition mein errorElement property daal sakte hain

- Yeh property parent route ya child route - kisi mein bhi laga sakte hain

Dhyaan rakhne wali baatein:

- Agar aap errorElement sirf parent component mein daalte hain (aur nested routes hain), toh poori application error component se replace ho jayegi

- Warna, agar aap ise child routes mein daalte hain, toh sirf woh hissa replace hoga, aur parent ka layout bana rahega

Example:

```jsx
// some code here
import ErrorComponent from "path/to/ErrorComponent";

const router = createBrowserRouter([
  {
    element: <Component />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "nested-route/component1/path",
        element: <Component1 />,
      },
      {
        path: "nested-route/component2/path",
        element: <Component2 />,
      },
      {
        path: "nested-route/fetch-component/path",
        element: <ComponentWithFetching />,
        loader: customLoader,
        errorElement: <ErrorComponent />,
      },
      {
        path: "nested-route/fetch-component/path/:value",
        element: <ComponentWithFetching />,
        loader: customLoaderWithParams,
      },
    ],
  },
]);
// some more code here
```

Is tarah:

- Agar dashboard mein error aata hai, toh sirf DashboardError component show hoga

- Poori layout nahi badlegi! 😊

Fayda:

- Nested errors handle karne mein aasani

- Layout bachta hai, sirf error wala part replace hota hai

- Clean aur organized error handling!
