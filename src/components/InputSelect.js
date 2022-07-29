export const InputSelect = (props) => {
  const {
    selected,
    inputFocus,
    searchText,
    setSearchText,
    setShowChoice,
    setSelected,
  } = props;

  const removeFromList = (item) => {
    selected.splice(
      selected.findIndex((e) => e.code === item.code),
      1
    );
    const [...changedList] = selected;
    setSelected(changedList);
  };

  return (
    <div className="container">
      <div className="selectBox">
        {selected && selected.length > 0 && (
          <div className="selectedItems">
            {selected.map((item) => {
              return (
                <div className="item" key={item.code}>
                  <span className="pdr5">{item.name}</span>
                  <img
                    alt="remove"
                    src="https://cdn-icons-png.flaticon.com/512/458/458595.png"
                    height="8"
                    width="8"
                    onClick={() => removeFromList(item)}
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
          onChange={(e) => {
            setSearchText(e.target.value);
            setShowChoice(true);
          }}
        />
      </div>
      <div className="selectBtns">
        <img
          onClick={() => setSelected([])}
          alt="arrow"
          src="https://cdn-icons-png.flaticon.com/512/458/458595.png"
          height="10"
          width="10"
        />
        <div className="arrow">
          <img
            onClick={() => setShowChoice(true)}
            alt="arrow"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9VUtb_etUVsdoxBqtKD7jKFFPcKHYJigpjg&usqp=CAU"
            height="30"
            width="30"
          />
        </div>
      </div>
    </div>
  );
};
