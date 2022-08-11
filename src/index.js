import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import { QuizesProvider } from './contexts/QuizesContext'
import App from './App';
import GlobalStyles from './GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DatabaseProvider>
        <QuizesProvider>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </QuizesProvider>
      </DatabaseProvider>
    </AuthProvider>
  </React.StrictMode>
);
