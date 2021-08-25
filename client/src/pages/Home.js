import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import {AiFillLike} from "react-icons/ai";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:5000/api/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const addLike = (postId) => {
    axios
      .post(
        "http://localhost:5000/api/likes",
        { PostId: postId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  console.log(authState);

  return (
    <div className="home">
      {listOfPosts.map((value, key) => {
        return (
          <div className="card-post" key={key}>
            <div className="card-title">{value.title}</div>
            <div
              className="card-content"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.content}
            </div>
            <div className="footer">
              <Link className="linkProfile" to={`/profile/${value.UserId}`}>{value.User.pseudo}</Link>
              <div className="like-container">
                <AiFillLike className={
                    likedPosts.includes(value.id) ? "likeBtn" : "unlikeBtn"
                  }
                  onClick={() => {
                    addLike(value.id);
                  }}/>
                <span className={
                    likedPosts.includes(value.id) ? "likeBtn" : "unlikeBtn"
                  } >{value.Likes.length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
