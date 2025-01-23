import React from 'react';
import AppRoutes from './routes/Routes';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      
      <Provider store={store}>
        <AppRoutes />
      </Provider>
      </div>
  );
}

export default App;
