// Libraries
import React from "react"
import {Link} from 'react-router-dom'

// MaterialUI
import TextField  from "@material-ui/core/TextField"


const RestaurantInfo = props =>{

  const {rName, phoneNumber, password, description, address, logOutHandler} = props

  const addressString = `${address.address}, ${address.cityDescription}, ${address.provinceDescription}  ${address.postcode}`

  return(
    <div className="account__restaurantInfo">
      <div className="account__wrap1">
        <TextField InputProps={{readOnly: true}} fullWidth label="Restaurant Name" value={rName} />
        <TextField InputProps={{readOnly: true}} fullWidth label="Phone Number" value={phoneNumber} />
      </div>

      <div className="account__wrap2">
        <TextField InputProps={{readOnly: true}} fullWidth label="Password" type="password" value={password} />
        <TextField InputProps={{readOnly: true}} fullWidth label="Location"  value={addressString}/>
      </div>
      
      <TextField
        InputProps={{readOnly: true}}
        fullWidth
        label="Description"
        value={description}
        multiline
        rows={4}
      />

      <div className="account__buttonWrap">
        <Link to='/restaurant/accountEdit'>
          <button>Edit Account</button>
        </Link>
        <button className="account__logOutButton" onClick={logOutHandler}>Log Out</button>
      </div>
      
    </div>
  )
}

export default RestaurantInfo