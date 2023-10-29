// import ReactDom from "react-dom";
import React from "react";
import App from "./app";
import ReactDOM from "react-dom/client";

// ReactDom.render(<App />, document.getElementById("root"));
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)