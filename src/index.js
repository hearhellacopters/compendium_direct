import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "./redux/configureStore";
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

window.localStorage.setItem('err_mes', "{}")

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

