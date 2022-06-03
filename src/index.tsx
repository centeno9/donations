import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './routes/home';
import Login from './routes/login';
import { MyAccount } from './routes/myAccount';
import MyInfoContent from './pages/home/content/MyInfoContent/MyInfoContent';
import MyAdsContent from './pages/home/content/MyAdsContent/MyAdsContent';
import { useAuth } from './Context/UserContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth().user;
  let location = useLocation();

  if (auth === null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path="inicio" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="mi-cuenta" element={<RequireAuth><MyAccount /></RequireAuth>} >
            <Route index element={<MyInfoContent />} />
            <Route path="datos" element={<MyInfoContent />} />
            <Route path="mis-anuncios" element={<MyAdsContent />} />
          </Route>
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
