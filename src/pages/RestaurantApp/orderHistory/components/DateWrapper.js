// Libraries
import React from "react"
import moment from 'moment'

// Components
import OrderTable from './Table'



// Grouping Orders By The Date
// ordersGroupedByDate = [ {date: date, orders: []}]
const ordersGroupedByDate = []
const today = moment().format('MMM Do, YYYY')
const yesterday = moment().subtract(1, 'days').format('MMM Do, YYYY')

const ordersGrouper = (props) =>{
  ordersGroupedByDate.length = 0
  props.orders.map((element) => {
    let formattedDate = moment(element.createdAt).format('MMM Do, YYYY')
    console.log(element.createdAt)

    if(formattedDate === today){
      formattedDate = "Today"
    } else if (formattedDate === yesterday){
      formattedDate = "Yesterday"
    }

    const groupNum = ordersGroupedByDate.map((e) => { return e.date}).indexOf(formattedDate)

    if(groupNum >= 0){
      ordersGroupedByDate[groupNum].orders.push(element)
    }else{
      ordersGroupedByDate.unshift({date: formattedDate, orders: [element]})
    }
  })
}


const DateWrapper = props =>{

  ordersGrouper(props)

  return(
    <div>
      {ordersGroupedByDate.map((ordersGroup) => (
          <div　className="ordersTable__tableWrap">
            <h2>{ordersGroup.date}</h2>
            <OrderTable orders={ordersGroup.orders} />
          </div>
      ))}
    </div>
  )
}

export default DateWrapper
