import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { persistor, store } from './reduxMine/store';
import { PersistGate } from 'redux-persist/integration/react';
import jwt from 'jwt-decode'
import { login } from './reduxMine/features/authApi';

let accessToken = localStorage.getItem("accessToken");
let storedUser;
if (accessToken) {
  storedUser = jwt(accessToken);
}

if (storedUser) {
  store.dispatch(login(storedUser));
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
