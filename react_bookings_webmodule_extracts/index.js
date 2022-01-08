import React from "react";
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

let widgetDiv = document.getElementById('hsWidgetDiv');
let businessId = null;

if (widgetDiv) {
  businessId = widgetDiv.dataset.symbol;
}

if (!widgetDiv) {
  widgetDiv = document.createElement("div");

  const scriptTag = document.getElementById("hsWidgetScript");
  businessId = scriptTag.dataset.symbol;

  widgetDiv.setAttribute('id', "hsWidgetDiv")

  window.onload = () => {
    document.body.appendChild(widgetDiv);
  }
}

ReactDOM.render(
  <App businessId={businessId}/>,
  widgetDiv
);


