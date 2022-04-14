import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './routes/home';
import Login from './routes/login';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import { MyAccount } from './routes/myAccount';
import AuthRoute from './components/AuthRoute/AuthRoute';

initializeApp(config.firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path="inicio" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="mi-cuenta" element={<AuthRoute><MyAccount /></AuthRoute>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
