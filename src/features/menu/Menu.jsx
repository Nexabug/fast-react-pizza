import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "../menu/MenuItem";

function Menu() {
  const menu = useLoaderData();
  // console.log(menu);
  return (
    <ul className="grid grid-cols-2 mx-[9rem] mt-6 border border-yellow-400 rounded-md gap-6 p-3">
      {menu.map((pizza) => (
        
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
