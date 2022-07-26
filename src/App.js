import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [showChoice, setShowChoice] = useState(false);
  const [selected, setSelected] = useState([]);
  const [countries, setCountries] = useState();
  const [filterCountries, setFilterCountries] = useState(countries);
  const [searchText, setSearchText] = useState("");
  const [inputFocus, setInputFocus] = useState(true);
  const [errMessage, setErrorMessage] = useState("");


  useEffect(() => {
    setInputFocus(true)
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
      <div className="container" onClick={() => setShowChoice(!showChoice)}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {selected && selected.length > 0 && (
            <div className="selectedItems">
              {selected.map((item) => {
                return (
                  <div className="item" key={item.code}>
                    <span style={{ paddingRight: "5px" }}>{item.name}</span>
                    <img
                      alt="remove"
                      src="https://cdn-icons-png.flaticon.com/512/458/458595.png"
                      height="8"
                      width="8"
                      onClick={() => {
                        selected.splice(
                          selected.findIndex((e) => e.code === item.code),
                          1
                        );
                        const [...changedList] = selected;
                        setSelected(changedList);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <input
            autoFocus={inputFocus}
            className="txtInput"
            value={searchText}
            onClick={() => setShowChoice(true)}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowChoice(true);
            }}
          />
        </div>
        <img
          alt="arrow"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9VUtb_etUVsdoxBqtKD7jKFFPcKHYJigpjg&usqp=CAU"
          height="30"
          width="30"
        />
      </div>
      {showChoice && (
        <div className="selectOptions">
          {filterCountries.length > 0 ? (
            filterCountries.map((country) => {
              let isExist =
                selected.findIndex((x) => x.code === country.code) !== -1;
              return (
                <div
                  className="option"
                  style={{
                    backgroundColor: isExist && "rgb(234, 235, 238)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.toggle("optionsMouseEnter");
                    e.currentTarget.classList.remove("optionsMouseLeave");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.classList.toggle("optionsMouseLeave");
                    e.currentTarget.classList.remove("optionsMouseEnter");
                  }}
                  onClick={(e) => {
                    const [...arr] = selected;

                    if (
                      arr.findIndex((ele) => ele.code === country.code) === -1
                    ) {
                      arr.push(country);
                      setSelected(arr);
                      setErrorMessage("");
                      setSearchText("")
                      setInputFocus(true);

                    } else {
                      setErrorMessage("Утга сонгогдсон байна.");
                    }
                  }}
                  key={country.code}
                >
                  <span> {country.name}</span>
                </div>
              );
            })
          ) : (
            <span style={{ fontSize: 12, color: "red" }}>
              Таны хайсан утга олдсонгүй.
            </span>
          )}
        </div>
      )}

      {errMessage && (
        <div className="error">
          <span style={{ fontSize: 12, color: "white" }}>
            Сонгосон улс жагсаалтад байна.
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
