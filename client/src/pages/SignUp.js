import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom"
import swal from "sweetalert";

function SignUp() {
  let history = useHistory();
  const initialValues = {
    pseudo: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    pseudo: Yup.string().required("Vous devez mettre un pseudo"),
    password: Yup.string().required("Vous devez mettre un mot de passe"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/api/users/signup", data).then((response) => {
      if(response.status === 201){
        history.push("/login");
        swal("Bravo!", "Vous avez bien créer votre compte !", "success");
      }    });
  };

  return (
    <div className="signup">
      <h2>Inscription</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="signup-container">
          <div className="pseudo-container">
            <label>Pseudo</label>
            <Field name="pseudo" placeholder="Entrez un pseudo" />
            <ErrorMessage name="pseudo" component="span" />
          </div>

          <div className="password-container">
            <label>Mot de passe</label>
            <Field
              type="password"
              name="password"
              placeholder="Entrez un mot de passe"
            />
            <ErrorMessage name="password" component="span" />
          </div>

          <button className="btn-submit" type="submit">
            S'inscrire
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
