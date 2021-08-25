import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBack2Fill } from "react-icons/ri";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:5000/api/comments/${id}`).then((response) => {
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
            content: newComment,
            pseudo: response.data.User.pseudo,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
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
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        history.push("/");
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


  if(!postObject || !postObject.User) 
  return null;

  return (

    <div className="post">
      <div className="leftside">
        <div className="card-post">
          <div
            className="card-title"
            onClick={() => {
              if (authState.pseudo === postObject.User.pseudo) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>

          <div className="card-content">
            <div
              className="content"
              onClick={() => {
                if (authState.pseudo === postObject.User.pseudo) {
                  editPost("content");
                }
              }}
            >
              {postObject.content}
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
