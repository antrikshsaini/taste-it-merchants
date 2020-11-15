// Libraries
import React, { Component } from "react"
import axios from 'axios'
import moment from 'moment'

// MaterialUI
import { Button } from '@material-ui/core'
import { TextField } from "@material-ui/core"

// Components
import DateWrapper from "./components/DateWrapper"
import Loading from "../../Loading"

// Other
import { getJwtToken } from "../../getJwt"
import {BASE_URL} from "../../../config/config"


class ActiveOrders extends Component {

  state = {
    rName: '',
    numOfThisMonthOrders: 0,
    numOfLastMonthOrders: 0,
    increaseRate: 0,
    orders: [],
    isLoading: false
  }

  async componentDidMount() {

    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn")
    }

    this.setState({
      isLoading: true
    })

    // GET restaurant info(name)
    await axios
      .get(`${BASE_URL}/restaurants`, {
        headers: { Authorization: `${jwt}` },
      })
      .then((res) => {
        this.setState({
          rName: res.data[0].restaurantName,
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
        console.log(err)
      })


    // GET orders and select only completed orders
    await axios
      .get(`${BASE_URL}/orders/restaurant`, {headers: { Authorization: jwt }
    })
      .then((res) => {
        const completedOrders = res.data.filter((item) => {
          return item.orderStatusID == 4 || item.orderStatusID == 5
        })

        this.setState({
          orders: completedOrders,
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
        console.log(err.response)
    })


    let numOfThisMonthOrders = 0
    let numOfLastMonthOrders = 1

    this.state.orders.map((element) => {
      const formattedDate = moment(element.createdAt).format('MM, YYYY')
      console.log(formattedDate)
      const thisMonth = moment().format('MM, YYYY')
      const lastMonth = moment().subtract(1, 'months').format('MM, YYYY')

      if(formattedDate == thisMonth){
        numOfThisMonthOrders ++
      }else if(formattedDate == lastMonth){
        numOfLastMonthOrders ++
      }
    })

    let increaseRate = 0

    if((numOfThisMonthOrders/numOfLastMonthOrders) > 1 && numOfLastMonthOrders > 0){
      increaseRate = ((numOfThisMonthOrders/numOfLastMonthOrders)-1)*100
    }

    this.setState({
      numOfThisMonthOrders: numOfThisMonthOrders,
      numOfLastMonthOrders: numOfLastMonthOrders,
      increaseRate: increaseRate
    })
  }

  // // Calculate the number of orders this month and last month, and the increase/decrease rate
  // staticsCalculator = () =>{
    
  // }

  render() {
    const {rName, orders, isLoading, numOfThisMonthOrders, increaseRate} = this.state
    const lastMonth = moment().subtract(1, 'months').format('MMMM')
    


    return (
        <div>
          <p>Hi {rName}, let's customize your menu now</p>
          <h1>Order History</h1>

          <div>
            <h3>Analyze Your Data Now</h3>
            <p>Did you know that you can track your data with our Pro pack?</p>
            <Button>See Our Pro Plan</Button>
          </div>

          <div>
            <h3>Your orders in {moment().format('MMMM')}</h3>
            <h2>{numOfThisMonthOrders}</h2>
            <p>
              {
                increaseRate 
                  ? `Increase ${increaseRate}% compared to ${lastMonth}` 
                  : ''
              }
            </p>
          </div>

          {
            isLoading ? <Loading /> :
            <DateWrapper orders={orders}/>
          }
          
          <Button>Load More</Button>
        </div>
    )
  }
}
export default ActiveOrders
