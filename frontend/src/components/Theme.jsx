import React from "react";
import axios from "axios";

function Theme() {

    function callAxios() {
        console.log("hello");
        const resp = axios.post('http://localhost:5000/theme/edit', { message: "hello" });
    }

    return (
        <div>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <button onClick={callAxios}></button>
        </div>
    );
}

export default Theme;
