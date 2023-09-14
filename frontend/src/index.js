import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
