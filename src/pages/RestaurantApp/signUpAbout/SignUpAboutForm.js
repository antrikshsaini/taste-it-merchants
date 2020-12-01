import React from "react";
import { useForm, Form } from "../useForm";
import Controls from "../../../components/controls/Controls";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getJwtToken } from "../../../components/getJwt";
import {BASE_URL} from "../../../config/config"

const initialFValues = {
  restaurantName: "",
  restaurantDescription: "",
  phoneNumber: "",
};

export default function SignUpAboutForm() {
  const history = useHistory();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("restaurantName" in fieldValues) {
      temp.restaurantName =
        fieldValues.restaurantName.length > 3 ? "" : "Minimum 4 Characters Required";
    }
    if ("restaurantDescription" in fieldValues) {
      temp.restaurantDescription =
        fieldValues.restaurantDescription.length > 3 ? "" : "Minimum 4 Characters Required";
    }
    if ("phoneNumber" in fieldValues) {
      temp.phoneNumber =
        fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 Digits Required";
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
    const jwt = getJwtToken();
    if (!jwt) {
      history.push("/signIn");
    }
    if (validate()) {
      
    axios
      .put(
        `${BASE_URL}/restaurants/`,
        {
          restaurantName: values.restaurantName,
          restaurantDescription: values.restaurantDescription,
          phoneNumber: values.phoneNumber,
        },
        { headers: { 'Authorization': `${jwt}` } },
      )
      .then((res) => {
        history.push("/signUpAddress");
      })
      .catch((err) => {
        localStorage.removeItem("jwt-token");
        history.push("/signIn");
      });
      
    resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        <div className="signUp-about__form">
          <Controls.TextFieldControl
            name="restaurantName"
            label="Restaurant Name"
            value={values.restaurantName}
            onChange={handleInputChange}
            error={errors.restaurantName}
            InputLabelProps={{
              required: true,
            }}
          />
          <Controls.TextFieldControl
            name="phoneNumber"
            label="Phone Number"
            value={values.phoneNumber}
            onChange={handleInputChange}
            error={errors.phoneNumber}
            InputLabelProps={{
              required: true,
            }}
          />
          <Controls.TextFieldControl
            className="signUp-about__descriptionInput"
            name="restaurantDescription"
            label="Restaurant Description"
            value={values.restaurantDescription}
            onChange={handleInputChange}
            multiline
            rows={4}
            error={errors.restaurantDescription}
            InputLabelProps={{
              required: true,
            }}
          />

          <button type="submit">Next</button>
        </div>
      <div/>
    </Form>
  );
}
