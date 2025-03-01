import './App.css';
import Lista from "./components/Lista/Lista";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OrderMenu from './components/OrderMenu/OrderMenu';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
function App() {
  return (
    <div className="App">
    <ShoppingCartProvider>
      <Lista/>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
