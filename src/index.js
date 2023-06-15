import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Auth0Provider
      domain="dev-4q522vtnef6mae4q.us.auth0.com"
      clientId="tIBFQHEI0oB5Czu1mCZbqvHPIQbcW64Q"
      // audience="https://canofbooks/api"
      //  redirect_uri={window.location.origin}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >

      <App />
    </Auth0Provider>

  </React.StrictMode>
);
