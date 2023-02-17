export const SelectList = (props) => {
  const {
    filterCountries,
    selected,
    setSelected,
    setErrorMessage,
    setSearchText,
    setInputFocus,
  } = props;

  const onMouseEnter = (e) => {
    e.currentTarget.classList.toggle("optionsMouseEnter");
    e.currentTarget.classList.remove("optionsMouseLeave");
  };

  const onMouseLeave = (e) => {
    e.currentTarget.classList.toggle("optionsMouseLeave");
    e.currentTarget.classList.remove("optionsMouseEnter");
  };

  const onAddtoList = (country) => {
    const [...arr] = selected;

    if (arr.findIndex((ele) => ele.code === country.code) === -1) {
      arr.push(country);
      setSelected(arr);
      setErrorMessage("");
      setSearchText("");
      setInputFocus(true);
    } else {
      setErrorMessage("Утга сонгогдсон байна.");
    }
  };

  return (
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
              onMouseEnter={(e) => onMouseEnter(e)}
              onMouseLeave={(e) => onMouseLeave(e)}
              onClick={() => onAddtoList(country)}
              key={country.code}
            >
              <span>
                {country.name}
                {/* {country.name.replace(searchText, searchText.toUpperCase())} */}
              </span>
            </div>
          );
        })
      ) : (
        <span className="textColorRed fs12">Таны хайсан утга олдсонгүй.</span>
      )}
    </div>
  );
};
