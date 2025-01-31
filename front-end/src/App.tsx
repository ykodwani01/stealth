import { Button } from "@/components/ui/button"
import AppRoutes from './routes/Routes';
import './App.css'
import { Provider } from 'react-redux'
import store from './store'

function App() {

  return (
    <Provider store={store}>
    <AppRoutes />
  </Provider>
  )
}

export default App
