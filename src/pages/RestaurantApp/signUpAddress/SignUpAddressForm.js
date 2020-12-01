import React from "react";
import { useForm, Form } from "../useForm";
import Controls from "../../../components/controls/Controls";
import * as provinceService from "../provinceService";
import * as cityService from "../cityService";
import { useHistory } from "react-router-dom";
import { getJwtToken } from "../../../components/getJwt";
import axios from "axios"
import {BASE_URL} from "../../../config/config"

////////////Using hooks

const initialFValues = {
  address: "",
  postcode: "",
  provinceNameId: "",
  cityNameId: "",
};

export default function SignUpAddressForm() {
  const history = useHistory();
let province = {
    
      1: 'British Columbia',
      2: 'Alberta',
      3: 'Ontario',
      4: 'Schatchwan'
  
}
let city = {
    
  1: 'Vancouver',
  2: 'Richmond',
  3: 'Surrey',
  4: 'Burnaby'

}
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("address" in fieldValues) {
      temp.address =
        fieldValues.address.length > 3 ? "" : "Minimum 4 Characters Required";
    }
    if ("postcode" in fieldValues) {
      temp.postcode =
        fieldValues.postcode.length > 5 ? "" : "Minimum 6 Characters Required";
    }
    if ("provinceNameId" in fieldValues){
      temp.provinceNameId =
      fieldValues.provinceNameId.length !== 0 ? "" : "This field is required.";
    } 
    if ("cityNameId" in fieldValues){
      temp.cityNameId =
      fieldValues.cityNameId.length !== 0 ? "" : "This field is required.";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
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
    if (validate()){
    const elements = {
      address: values.address,
      postcode: values.postcode,
      provinceName: values.provinceNameId,
      cityName: values.cityNameId
    };
    axios
      .post(`${BASE_URL}/restaurants/address`, elements, {
        headers: { 'Authorization': `${jwt}` },
      })
      .then((res) => {
        history.push("/welcome");
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
      <div className="signUp-address__form">

        <div className="smallInput">
          <Controls.SelectControl
            name="provinceNameId"
            label="Province"
            value={province[values.provinceNameId]}
            onChange={handleInputChange}
            options={provinceService.getProvinceCollection()}
            inputlabelprops={{
              required: true,
            }}
            error={errors.provinceNameId}
          />
          <Controls.SelectControl
            name="cityNameId"
            label="City"
            value={city[values.cityNameId]}
            onChange={handleInputChange}
            options={cityService.getCityCollection()}
            inputlabelprops={{
              required: true,
            }}
            error={errors.cityNameId}
          />
        </div>

        <Controls.TextFieldControl
          name="address"
          label="Address"
          value={values.address}
          onChange={handleInputChange}
          inputlabelprops={{
            required: true,
          }}
          error={errors.address}
        />
        <Controls.TextFieldControl
          label="Postal Code"
          name="postcode"
          value={values.postcode}
          onChange={handleInputChange}
          inputlabelprops={{
            required: true,
          }}
          error={errors.postcode}
        />

        <button type="submit">Done</button>
       </div>
    </Form>
  );
}
