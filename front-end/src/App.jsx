import React from 'react';
import AppRoutes from './routes/Routes';
import { Provider } from "react-redux";
import store from "./store";
import './App.css';

function App() {
  return (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
  );
}

export default App;
