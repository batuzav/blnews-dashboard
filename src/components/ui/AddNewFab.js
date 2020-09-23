import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="ntn btn-primary fab"
      onClick={() => dispatch(uiOpenModal())}
    >
      <i className="fa fa-plus"></i>
    </button>
  );
};
