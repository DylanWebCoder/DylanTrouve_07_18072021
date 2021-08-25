import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function SignUp() {
  const initialValues = {
    pseudo: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    pseudo: Yup.string().required("Vous devez mettre un pseudo"),
    password: Yup.string().required("Vous devez mettre un mot de passe"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/api/users/signup", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="signup">
      <h2>Inscription</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="group">
            <Field name="pseudo" placeholder="Entrer un pseudo" />
            <label>Pseudo : </label>
            <ErrorMessage name="pseudo" component="span" />
          </div>

          <div className="group">
            <Field
              type="password"
              name="password"
              placeholder="Entrer un mot de passe"
            />
            <label>Mot de passe : </label>
            <ErrorMessage name="password" component="span" />
          </div>

          <button className="btn-submit" type="submit">S'inscrire</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
