import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuizesProvider } from './QuizesContext'
import GlobalStyles from './GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizesProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </QuizesProvider>
  </React.StrictMode>
);
