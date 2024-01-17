import React, { Children, FC, useState } from "react";
import "./App.css";
import { List } from "./components/List";
import { useDictionary } from "./hooks/useDictionary";
import useDebounce from "./components/useDebounce";

function App() {
  const dictionary = useDictionary();
  const [search, setSearch] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);

  useDebounce(
    () => {
      if (search.length > 0) {
        setFilteredWords(
          dictionary.filter((d) =>
            d.toLowerCase().includes(search.toLowerCase())
          )
        );
      }

      if (search.length < 1) {
        setFilteredWords([]);
      }
    },
    [dictionary, search],
    800
  );

  const handleSearch = (e) => setSearch(e.target.value);
  return (
    <div className="app">
      <div className="header">
        <div>Render Virtualized</div>
      </div>

      <div className="content">
        <h2>Search in dictionary :</h2>
        <input
          id="search"
          type="text"
          spellCheck="false"
          placeholder="Search in dictionary "
          value={search || ""}
          onChange={handleSearch}
        />
        <br />
        <h6>Search results for keyword: {search}</h6>
        <br/>
        {filteredWords.length > 0 && <List items={filteredWords} />}
      </div>

      <div className="content">
        {filteredWords.length === 0 && <List items={dictionary} />}
      </div>
    </div>
  );
}

export default App;
