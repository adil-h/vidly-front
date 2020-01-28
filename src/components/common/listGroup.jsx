import React from "react";

const ListGroup = props => {
  const {
    groups,
    selectedGroup,
    onSelect,
    textProperty,
    valueProperty
  } = props;

  console.log(selectedGroup);
  return (
    <div className="list-group">
      <React.Fragment>
        {groups.map(group => {
          return (
            <button
              type="button"
              className={
                "list-group-item list-group-item-action " +
                (group === selectedGroup ? "active" : "")
              }
              key={group[valueProperty]}
              onClick={() => onSelect(group)}
            >
              {group[textProperty]}
            </button>
          );
        })}
      </React.Fragment>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
