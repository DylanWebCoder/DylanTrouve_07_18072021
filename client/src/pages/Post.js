import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import swal from "sweetalert";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/byId/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:5000/api/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:5000/api/comments",
        { content: newComment, PostId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            id: comments.id,
            content: newComment,
            User: { pseudo: authState.pseudo },
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
        window.location.reload()
        //swal("Commentaire ajouté !", "", "success");
      });
  };

  const deleteComment = (id) => {
    swal({
      title: "Êtes-vous sûr ?",
      text: "Vous allez supprimer définitivement ce commentaire !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/api/comments/${id}`, {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then(() => {
            setComments(
              comments.filter((val) => {
                return val.id != id;
              })
            );
          });
        swal("Vous avez bien supprimer le commentaire !", {
          icon: "success",
        });
      } else {
        swal("Vous n'avez pas supprimez le commentaire !");
      }
    });
  };

  const deletePost = (id) => {
    swal({
      title: "Êtes-vous sûr ?",
      text: "Vous allez supprimer définitivement ce post !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/api/posts/${id}`, {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then(() => {
            history.push("/");
          });
        swal("Vous avez bien supprimer le post !", {
          icon: "success",
        });
      } else {
        swal("Vous n'avez pas supprimer le post");
      }
    });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Modifier le titre");
      axios.put(
        "http://localhost:5000/api/posts/title",
        { newTitle: newTitle, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newContent = prompt("Modifier le contenu");
      axios.put(
        "http://localhost:5000/api/posts/content",
        { newContent: newContent, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setPostObject({ ...postObject, content: newContent });
    }
  };

  if ((!postObject || !postObject.User) && (!comments || !comments.User))
    return null;

  return (
    <div className="post">
      <div className="leftside">
        <div className="card-post">
          <div className="card-title">
            <h3>{postObject.title}</h3>
            <GrUpdate
              className="icon-update-title"
              onClick={() => {
                if (authState.pseudo === postObject.User.pseudo) {
                  editPost("title");
                }
              }}
            />
          </div>

          <div className="card-content">
            <div className="content">
              <p>{postObject.content}</p>
              <GrUpdate
                className="icon-update-content"
                onClick={() => {
                  if (authState.pseudo === postObject.User.pseudo) {
                    editPost("content");
                  }
                }}
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="pseudo">
              <span>{postObject ? postObject.User.pseudo : ""}</span>
              {(authState.pseudo === postObject.User.pseudo ||
                authState.isAdmin === true) && (
                <AiTwotoneDelete
                  onClick={() => {
                    deletePost(postObject.id);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rightside">
        <div className="addcomment">
          <input
            type="text"
            placeholder="Entrer un commentaire..."
            value={newComment}
            autoComplete="off"
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <GrAdd onClick={addComment} />
        </div>
        <div className="listofcomments">
          {comments.map((comment, key) => {
            return (
              <div className="comment-container" key={key}>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-pseudo">
                  <span>{comment.User.pseudo}</span>
                  {(authState.pseudo === comment.User.pseudo ||
                    authState.isAdmin === true) && (
                    <RiDeleteBack2Fill
                      onClick={() => deleteComment(comment.id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
