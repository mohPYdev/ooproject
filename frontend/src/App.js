import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import ItemCard from './compomemts/ItemCard'
import ItemList from './section/ItemList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<ItemList/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
