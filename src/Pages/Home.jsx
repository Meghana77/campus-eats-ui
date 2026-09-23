import { useState } from "react";
import Search from "../Components/Search";
import RestaurantContainer from "../Components/RestaurantContainer";

function Home() {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Search setSearchText={setSearchText} />
      <RestaurantContainer searchText={searchText} />
    </>
  );
}

export default Home;
