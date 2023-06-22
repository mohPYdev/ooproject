import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ItemCard from "./compomemts/ItemCard";
import ItemList from "./section/ItemList";
import Home from "./pages/Home";
import Navbarc from "./section/Navbarc";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Reservation from "./pages/Reservation";
import Profile from "./pages/Profile";
import ResetPass from "./pages/ResetPass";
import ResetPassConfirm from "./pages/ResetPassConfirm";
import { useEffect } from "react";
import axios from "axios";
import { authentication } from "./context/actions";
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const authIsReady = useSelector((state) => state.authIsReady);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    dispatch(authentication(JSON.parse(user)));

    if (user) {
      // add headers
      axios.defaults.headers.common["Authorization"] = `Token ${JSON.parse(
        token
      )}`;
    }
  }, []);
  return (
    <BrowserRouter>
      {authIsReady && (
        <div className="App">
          <Navbarc />
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/reservation/:id"
              element={user ? <Reservation /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/password/reset"
              element={!user ? <ResetPass /> : <Navigate to="/home" />}
            />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={!user ? <ResetPassConfirm /> : <Navigate to="/home" />}
            />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
