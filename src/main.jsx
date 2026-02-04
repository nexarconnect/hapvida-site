import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

// GA4
ReactGA.initialize("G-XQ7QZX7BHT");
ReactGA.send("pageview");

// Meta Pixel
ReactPixel.init("1403680251552283", {}, { autoConfig: true, debug: false });
ReactPixel.pageView();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);