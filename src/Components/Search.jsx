import "./Search.css";

function Search() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for restaurants..."
      />
      <button>Search</button>
    </div>
  );
}

export default Search;