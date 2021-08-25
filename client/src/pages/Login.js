import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  let history = useHistory();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { pseudo: pseudo, password: password };
    axios
      .post("http://localhost:5000/api/users/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            pseudo: response.data.pseudo,
            id: response.data.id,
            status: true,
            isAdmin: response.data.isAdmin
          });
          history.push("/");
        }
      });
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
        <div className="group">
          <input
            type="text"
            onChange={(event) => {
              setPseudo(event.target.value);
            }}
          />
          <label>Pseudo</label>
        </div>
        <div className="group">
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label>Mot de passe</label>
        </div>
        <button onClick={login}>Se connecter</button>
    </div>
  );
}

export default Login;
