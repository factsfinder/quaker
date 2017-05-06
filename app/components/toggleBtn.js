import React from 'react';

const ToggleButton = (props) => {
  return (
      <button className="list-btn" onClick={props.toggleList}>{props.listBtnName}</button>
  );
}

export default ToggleButton;
