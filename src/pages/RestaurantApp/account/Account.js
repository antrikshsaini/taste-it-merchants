// Libraries
import React, { Component } from "react"
import {Route} from 'react-router-dom'
import axios from 'axios'

// Components
import RestaurantInfo from './components/RestaurantInfo'
import RestaurantInfoEditor from './components/RestaurantInfoEditor'

// Other
import { getJwtToken } from "../../../components/getJwt"
import {BASE_URL} from "../../../config/config"
import { withRouter } from 'react-router-dom';

class Contact extends Component {

  state = {
    rName: '',
    phoneNumber: '',
    password: '',
    description: '',
    addressSet: {},
    province: '',
    city: '',
    address: '',
    postcode: ''
  }
  
  componentDidMount() {
    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn")
    }

    axios
      .get(`${BASE_URL}/restaurants`, {headers: { Authorization: `${jwt}` }}
      )
      .then((res) => {
        this.setState({
          rName: res.data[0].restaurantName,
          phoneNumber: res.data[0].phoneNumber,
          password: res.data[0].password,
          description: res.data[0].restaurantDescription,
        })
      })
      .catch((err) => {
        localStorage.removeItem("jwt-token")
        this.props.history.push("/signIn")
      })

    axios
      .get(`${BASE_URL}/restaurants/address`, {headers: { Authorization: `${jwt}` }}
      )
      .then((res) => {
        this.setState({
          addressSet: res.data[0],
          province: res.data[0].provinceDescription,
          city: res.data[0].cityDescription,
          address: res.data[0].address,
          postcode: res.data[0].postcode
        })
      })
      .catch((err) => {
        localStorage.removeItem("jwt-token")
        this.props.history.push("/signIn")
      })
  }


  // Update Restaurant Account Info
  saveInfo = (e) => {
    e.preventDefault()
    const {rName, phoneNumber, password, description, province, city, address, postcode } = this.state

    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn")
    }

    axios
      .put(`${BASE_URL}/restaurants`, {
        restaurantName: rName,
        restaurantDescription: description,
        phoneNumber: phoneNumber,
        password: password
      }, {headers: { Authorization: `${jwt}` }}
      )
      .catch((err) => {
        localStorage.removeItem("jwt-token")
        this.props.history.push("/signIn")
      })

    axios
      .put(`${BASE_URL}/restaurants/address`, {
        provinceName: province,
        cityName: city,
        address: address,
        postcode: postcode
      }, {headers: { Authorization: `${jwt}` }}
      )
      .catch((err) => {
        localStorage.removeItem("jwt-token")
        this.props.history.push("/signIn")
      })
  }
// log out handler, delete token and send to signIN
logOutHandler = (e) => {
  e.preventDefault()
  localStorage.removeItem("jwt-token")
        this.props.history.push("/")
}


  // Input Change Handlers
  handleNameInputChange = input => {
    this.setState({
      rName: input
    })
  }

  handlePhoneNumberInputChange = input => {
    this.setState({
      phoneNumber: input
    })
  }

  handlePasswordInputChange = input => {
    this.setState({
      password: input
    })
  }

  handleDescriptionInputChange = input => {
    this.setState({
      description: input
    })
  }

  handleProvinceInputChange = input => {
    this.setState({
      province: input
    })
  }

  handleCityInputChange = input => {
    this.setState({
      city: input
    })
  }

  handleAddressInputChange = input => {
    this.setState({
      address: input
    })
  }

  handlePostalCodeInputChange = input => {
    this.setState({
      postcode: input
    })
  }


  render() {

    const {rName, phoneNumber, password, description, addressSet} = this.state

    return (
        <div className="account">
          <div className="account__title">
            <p>Hi {rName}, keep your restaurant info updated.</p>
            <h1>Your Account</h1>
          </div>
          
          <div>
            <Route path="/restaurant/account">
              <RestaurantInfo rName={rName} phoneNumber={phoneNumber} password={password} description={description} address={addressSet} logOutHandler={this.logOutHandler}/>
            </Route>
            <Route path="/restaurant/accountEdit">
              <RestaurantInfoEditor 
                rName={rName} 
                phoneNumber={phoneNumber} 
                password={password} 
                description={description} 
                address={addressSet}
                handleNameInputChange={this.handleNameInputChange}
                handlePhoneNumberInputChange={this.handlePhoneNumberInputChange}
                handlePasswordInputChange={this.handlePasswordInputChange}
                handleDescriptionInputChange={this.handleDescriptionInputChange}
                handleProvinceInputChange={this.handleProvinceInputChange}
                handleCityInputChange={this.handleCityInputChange}
                handleAddressInputChange={this.handleAddressInputChange}
                handlePostalCodeInputChange={this.handlePostalCodeInputChange}
                saveInfo={this.saveInfo}
                />
            </Route>
          </div>
        </div>
    )
  }}


export default withRouter(Contact)
