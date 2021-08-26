import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import swal from "sweetalert";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  const initialValues = {
    title: "",
    content: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vous devez mettre un titre"),
    content: Yup.string().required("Vous devez mettre un contenu"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((reponse) => {
        swal("Vous venez de créer un post !")
        history.push("/");
      });
  };

  return (
    <div className="createpost">
      <h2>Créer un post</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="createpost-container" >
          <label>Titre : </label>
          <ErrorMessage name="title" component="span" />
          <Field id="" name="title" placeholder="Titre du post" />
          <label>Contenu : </label>
          <ErrorMessage name="content" component="span" />
          <Field id="" name="content" placeholder="Contenu du post" />
          {/*<label>Image : </label>
          <Field id="" name="image" placeholder="Image du post" type="file" /> */}
          <button className="btn-submit" type="submit">Créer le post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
