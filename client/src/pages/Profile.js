import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [pseudo, setPseudo] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/infos/${id}`)
      .then((response) => {
        setPseudo(response.data.pseudo);
    });

    axios.get(`http://localhost:5000/api/posts/byuserId/${id}`).then((response) => {
        setListOfPosts(response.data);
    })

    

  }, []);

  const deleteUser = () => {
    axios.delete(`http://localhost:5000/api/users/delete/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(() => {
      localStorage.removeItem("accessToken");
      history.push("/login");
    })
  };
    
 

  return (
    <div>
      <div className="informations">
        <h2>{pseudo}</h2>
        {authState.pseudo === pseudo && <button onClick={() => {history.push("/changepassword")}} >Changer le mdp</button>}
        {authState.pseudo === pseudo && <button onClick={deleteUser} >Supprimer le compte</button>}
      </div>
      <div className="listposts">Liste des posts</div>
    </div>
  );
}

export default Profile;
