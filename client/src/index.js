// 

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Redux Provider
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store'; // Import Redux store and persistor
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    {/* Wrap the app with Redux Provider */}
    <Provider store={store}>
      {/* Wrap the app with PersistGate to enable state persistence */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
