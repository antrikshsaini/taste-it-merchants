// Libraries
import React, { Component } from "react"
import axios from 'axios'
import moment from 'moment'

// Components
import DateWrapper from "./components/DateWrapper"
import Loading from "../../../components/Loading"

// Other
import { getJwtToken } from "../../../components/getJwt"
import {BASE_URL} from "../../../config/config"
import TomatoSoup from "../../../assets/img/dishes/tomatoSoup.png"
import TomatoSoupWebP from "../../../assets/img/dishes/tomatoSoup.png.webp"


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
      })


    // GET orders and select only completed orders
    await axios
      .get(`${BASE_URL}/orders/restaurant`, {headers: { Authorization: jwt }
    })
      .then((res) => {
        const completedOrders = res.data.filter((item) => {
          return item.orderStatusID === 4 || item.orderStatusID === 5
        })
        console.log(completedOrders)
        this.setState({
          orders: completedOrders,
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
    })


    let numOfThisMonthOrders = 0
    let numOfLastMonthOrders = 1

    this.state.orders.map((element) => {
      const formattedDate = moment(element.createdAt).format('MM, YYYY')
      const thisMonth = moment().format('MM, YYYY')
      const lastMonth = moment().subtract(1, 'months').format('MM, YYYY')

      if(formattedDate === thisMonth){
        numOfThisMonthOrders ++
      }else if(formattedDate === lastMonth){
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
        <div className="orderHistory">
          <div className="orderHistory__titleWrap">
            <p>Hi {rName}, let’s track your past orders and reviews</p>
            <h1>Order History</h1>
          </div>
          
          <div className="orderHistory__ctaWrap">
            <div className="orderHistory__cta">
              <picture>
                <source srcSet={TomatoSoupWebP} type="image/webp" />
                <img src={TomatoSoup} alt="Tomato Soup" />
              </picture>
              <h3>Analyze Your Data Now</h3>
              <p>Did you know that you can track your data with our Pro pack?</p>
              <button>See Our Pro Plan</button>
            </div>

            <div  className="orderHistory__statics">
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
          </div>

          {
            isLoading ? <Loading /> :
            <DateWrapper orders={orders}/>
          }
          
          <button className="orderHistory__loadButton">Load More</button>
        </div>
    )
  }
}
export default ActiveOrders
