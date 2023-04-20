import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import ItemCard from './compomemts/ItemCard'
import ItemList from './section/ItemList';
import Home from './pages/Home'
import Navbarc from './section/Navbarc';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Reservation from './pages/Reservation';
function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <BrowserRouter>
      {authIsReady && (

        <div className="App">

          <Navbarc />
          <Routes>
            <Route
              exact
              path="/"
              element={user
              ? <Home/>
              : <Navigate to="/login"/>}/>
            <Route
              path="/login"
              element={!user
              ? <Login/>
              : <Navigate to="/"/>}/>
            <Route
              path='/signup'
              element={!user
              ? <SignUp/>
              : <Navigate to="/"/>}/>
            <Route
              path='/home'
              element={user
              ? <Home/>
              : <Navigate to="/login"/>}/>
            <Route
              path='/reservation/:id'
              element={user
              ? <Reservation/>
              : <Navigate to="/login"/>}/>
            {/* <Route
              path='/profile'
              element={user
              ? <Profile/>
              : <Navigate to="/login"/>}/> */}
            {/* <Route
              path='/password/reset'
              element={!user
              ? <ResetPass/>
              : <Navigate to="/home"/>}/> */}
            {/* <Route
              path='/password/reset/confirm/:uid/:token'
              element={!user
              ? <ResetPassConfirm/>
              : <Navigate to="/home"/>}/> */}

          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
