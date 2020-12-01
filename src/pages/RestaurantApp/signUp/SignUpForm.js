import React from "react";
import { useForm, Form } from "../useForm";
import Controls from "../../../components/controls/Controls";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {BASE_URL} from "../../../config/config"

const initialFValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("password" in fieldValues) {
      temp.password =
        fieldValues.password.length > 7 ? "" : "Minimum 8 Characters Required";
    }
    if ("email" in fieldValues) {
      temp.email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";
    }
    if ("confirmPassword" in fieldValues) {
      console.log(values.password)
      temp.confirmPassword =
        fieldValues.confirmPassword !== values.password ? "Password and confirm password does not match" : ""
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(
    initialFValues
    , true, validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {

    axios
      .post(`${BASE_URL}/restaurants/`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("jwt-token", res.data.token);
        history.push("/signUpAbout");
      });
      
    resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="signUp">
          <Controls.TextFieldControl
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
            InputLabelProps={{
              required: true,
            }}
          />
          <Controls.TextFieldControl
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
            InputLabelProps={{
              required: true,
            }}
          />
          <Controls.TextFieldControl
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            InputLabelProps={{
              required: true,
            }}
          />

          <div>
            <button type="submit">Sign Up</button>
          </div>
       </div>
    </Form>
  );
}
