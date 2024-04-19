import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SnackbarProvider>
    <App />
      </SnackbarProvider>
  </React.StrictMode>
);

