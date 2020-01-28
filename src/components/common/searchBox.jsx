import React from "react";

const SearchBox = props => {
  const { value, onChange } = props;
  return (
    <input
      className="form-control my-3"
      type="text"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default SearchBox;
