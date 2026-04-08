import { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ products, setFilterList }) => {
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (input) => {
    const value = input.target.value;
    setSearchWord(value);
    setFilterList(
      products.filter((item) =>
        item.productName?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchWord}
        onChange={handleChange}
      />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;