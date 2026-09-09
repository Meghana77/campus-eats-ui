import "./Search.css";

function Search({setSearchText}) {

  function handleClick(){
    console.log("Button is clicked");
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for restaurants..."
        onChange={(event)=>setSearchText(event.target.value)}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}

export default Search;