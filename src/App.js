import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputSelect } from "./components/InputSelect";
import { SelectList } from "./components/SelectList";

function App() {
  const [showChoice, setShowChoice] = useState(false);
  const [selected, setSelected] = useState([]);
  const [countries, setCountries] = useState();
  const [filterCountries, setFilterCountries] = useState(countries);
  const [searchText, setSearchText] = useState("");
  const [inputFocus, setInputFocus] = useState(true);
  const [errMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setInputFocus(true);
    axios
      .get("./countries.json")
      .then((res) => {
        setCountries(res.data);
        setFilterCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (countries) {
      const filterCountries = countries.filter((a) => {
        return a.name.toLowerCase().includes(searchText.toLocaleLowerCase());
      });
      setFilterCountries(filterCountries);
      console.log("filter", filterCountries);
    }
  }, [searchText]);

  return (
    <div className="App">
      <InputSelect
        selected={selected}
        searchText={searchText}
        setSearchText={setSearchText}
        inputFocus={inputFocus}
        setShowChoice={setShowChoice}
        setSelected={setSelected}
      />
      {showChoice && (
        <SelectList
          setSearchText={setSearchText}
          selected={selected}
          setSelected={setSelected}
          setErrorMessage={setErrorMessage}
          filterCountries={filterCountries}
          setInputFocus={setInputFocus}
        />
      )}

      {errMessage && (
        <div className="error">
          <span className="textColorWhite fs12">
            Сонгосон улс жагсаалтад байна.
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
