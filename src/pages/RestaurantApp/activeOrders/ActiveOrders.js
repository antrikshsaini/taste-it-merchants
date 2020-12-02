// Libraries
import React, { Component } from "react"
import axios from 'axios'
import { getJwtToken } from "../../../components/getJwt"

// Components
import DateWrapper from "./components/DateWrapper"
import Loading from "../../../components/Loading"

// Other
import {BASE_URL} from "../../../config/config"
import Nacho from "../../../assets/img/dishes/nacho.png"
import NachoWebP from "../../../assets/img/dishes/nacho.png.webp"


class ActiveOrders extends Component {
  state = {
    rName: '',
    orders: [],
    isLoading: false
  }

  async componentDidMount() {
    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn");
    }

    this.setState({
      isLoading: true
    })

    // GET restaurant info
    axios
      .get(`${BASE_URL}/restaurants`, 
        {headers: { Authorization: `${jwt}` }}
      )
      .then((res) => {
        this.setState({
          rName: res.data[0].restaurantName,
          isActive: res.data[0].isActive,
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
      })

    // GET orders
    axios
      .get(`${BASE_URL}/orders/restaurant`, 
        {headers: { authorization: `${jwt}` }}
      )
      .then((res) => {
        // Filter out only active orders from response
        const activeOrders = res.data.filter((item) => {
          return item.orderStatusID === 1 || item.orderStatusID === 2 || item.orderStatusID === 3
        })

        console.log(activeOrders)

        this.setState({
          orders: activeOrders,
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
      })
  }


  // Update orders' status
  onStatusChange = (orderID, orderStatusID) =>{

    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn")
    }

    axios
      .put(`${BASE_URL}/orders`, {
        orderID: orderID,
        orderStatusID: orderStatusID
      }, {headers: { Authorization: `${jwt}` }}
      )
      .then((res)=>{

      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
      })
  }


  // Update restaurant's isActive status
  onActiveStatusChange = () =>{
    const jwt = getJwtToken()
    if (!jwt) {
      // this.props.history.push("/signIn")
    }

    this.setState({
      isActive: this.state.isActive ? false : true
    })

    axios
      .put(`${BASE_URL}/restaurants`, {
        isActive: this.state.isActive
      }, {headers: { Authorization: `${jwt}` }}
      )
      .then((res)=>{
      
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
        
      })
  }


  render() {
    const {rName, orders, isActive ,isLoading} = this.state

    return (
      <div className="activeOrders">
        <div className="activeOrders__titleWrap">
          <p>Hi {rName}, welcome back!</p>
          <h1>Active Orders</h1>
        </div>
        

        {
          isActive ? 
                    <div className="activeOrders__onOffWrap">
                      <picture>
                        <source srcSet={NachoWebP} type="image/webp" />
                        <img src={Nacho} alt="Nachos and Chips" />
                      </picture>
                      <div>
                        <h3>Take A Break</h3>
                        <p>You can deactivate your restaurant to stop receieving orders.</p>
                        <button onClick={this.onActiveStatusChange} >Go Offline</button>
                      </div>
                    </div>
                   :
                    <div  className="activeOrders__onOffWrap">
                      <picture>
                        <source srcSet={NachoWebP} type="image/webp" />
                        <img src={Nacho} alt="Nachos and Chips" />
                      </picture>
                      <div>
                        <h3>Let's Get Started</h3>
                        <p>Please activate your restaurant to start receieving orders.</p>
                        <button onClick={this.onActiveStatusChange} >Activate</button>
                      </div>
                    </div>
        }

        {
          isLoading ? 
                      <Loading /> 
                    :
                      <DateWrapper orders={orders} onStatusChange={this.onStatusChange} />
        }
        
      </div>
    );
  }
}
export default ActiveOrders;
