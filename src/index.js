import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChatContextProvider } from './utils/context/ChatContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </React.StrictMode>
);
