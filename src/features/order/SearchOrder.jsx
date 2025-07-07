import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setquery] = useState("");
  const naviagte = useNavigate();
  function handelsubmit(e) {
    e.preventDefault();

    if (!query) return;

    naviagte(`/order/${query}`);
    setquery("");
  }
  return (
    <form onSubmit={handelsubmit}>
      <input
      className="px-4 py-2.5 rounded-full w-[350px] bg-yellow-100"
        placeholder="order number pls?"
        value={query}
        onChange={(e) => setquery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
