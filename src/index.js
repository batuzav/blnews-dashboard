import React from "react";
import ReactDOM from "react-dom";
import { MyBLNewsApp } from "./MyBLNewsApp";
const url = `${process.env.REACT_APP_API_URL}/graphql`;
console.log("object", url);

ReactDOM.render(<MyBLNewsApp />, document.getElementById("root"));
