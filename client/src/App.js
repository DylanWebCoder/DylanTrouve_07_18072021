import "./App.css";
import { useHistory, BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile"
import Logo from "./images/icon-color-line.png"
// import ChangePassword from "./pages/ChangePassword";

import {BiLogOutCircle} from 'react-icons/bi';

import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  let history = useHistory();

  const [authState, setAuthState] = useState({
    pseudo: "",
    id: 0,
    status: false,
    isAdmin: false
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            pseudo: response.data.pseudo,
            id: response.data.id,
            status: true,
            isAdmin: response.data.isAdmin,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      pseudo: "",
      id: 0,
      status: false,
      isAdmin: false
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="left">
              {!authState.status ? (
                <>
                  <Link className="link-navbar" to="/login">Connexion</Link>
                  <Link className="link-navbar" to="/signup">S'inscrire</Link>
                </>
              ) : (
                <>
                  <Link className="link-navbar" to="/">Accueil</Link>
                  <Link className="link-navbar" to="/createpost">Créer un post</Link>
                </>
              )}
            </div>
            <div className="right">
              <Link className="pseudo-login" to={`/profile/${authState.id}`} >{authState.pseudo}</Link>
              {authState.status && (
                <BiLogOutCircle onClick={logout} /> 
              )}
            </div>
          </div>
          <div className="banner">
        <img alt="Logo de l'entreprise" src={Logo} />
      </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword"/>
            <Route path="*" exact component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
