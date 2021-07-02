import React from "react";
import axios from "axios";

const api = axios.create({
    baseURL:"https://icaf-backend-nnj.herokuapp.com/"
});

export default api;

