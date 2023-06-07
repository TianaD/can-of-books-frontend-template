import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Auth0Provider
      domain="dev-m12a6dyw8qu7lgb7.us.auth0.com"
      clientId="YkuqfCMmrTbgecFeTtdPaOptOsizc7I4"
      audience="https://canofbooks/api"
      scope="openid profile email"
      //  redirect_uri={window.location.origin}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >

      <App />
      </Auth0Provider>

  </React.StrictMode>
);
