import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import swal from "sweetalert";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [pseudo, setPseudo] = useState("");
  // const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/infos/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setPseudo(response.data.pseudo);
      });

    /*axios
      .get(`http://localhost:5000/api/posts/byuserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      }); */
  }, []);

  const deleteUser = () => {
    swal({
      title: "Êtes-vous sûr ?",
      text: "Vous allez supprimer votre compte !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/api/users/delete/${id}`, {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then(() => {
            localStorage.removeItem("accessToken");
            history.push("/login");
          });
        swal("Votre compte a bien été supprimer !", {
          icon: "success",
        });
      } else {
        swal("Votre compte n'est pas supprimé !");
      }
    });
  };

  return (
    <div>
      <div className="informations">
        <h2>{pseudo}</h2>
        <div className="buttons-profile">
          {/*{authState.pseudo === pseudo && (
            <button
              className="btn-submit"
              onClick={() => {
                history.push("/changepassword");
              }}
            >
              Changer le mdp
            </button>
            )}*/}
          {authState.pseudo === pseudo && (
            <button className="btn-submit" onClick={deleteUser}>
              Supprimer le compte
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
