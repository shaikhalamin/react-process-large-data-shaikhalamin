import React from "react";

const ListItem = ({ top, itemHeight, children }) => {
  return (
    <div className="item" style={{ top: top, height: itemHeight }}>
      {children}
    </div>
  );
};

export default ListItem;
