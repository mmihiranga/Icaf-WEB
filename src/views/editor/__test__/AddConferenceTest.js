import React from "react";
import { ReactDOM } from "react";
import AddConference from "../AddConference";
import { isTSAnyKeyword } from "@babel/types";
import { Button } from "bootstrap";

it("renders with out crashing",()=>{

    const div=document.createElement("div");
    ReactDOM.render(<AddConference/>,div)

}
)