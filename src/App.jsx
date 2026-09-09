import { useState } from "react";
import Header from "./Components/Header";
import Search from "./Components/Search";
import RestaurantContainer from "./Components/RestaurantContainer";
import Footer from "./Components/Footer";


function App(){
    const [searchText, setSearchText] = useState("");
    return (
        <div>
            <Header />
            <Search setSearchText={setSearchText} />
            <RestaurantContainer searchText={searchText} />
            <Footer />
        </div>
    );
}

export default App;