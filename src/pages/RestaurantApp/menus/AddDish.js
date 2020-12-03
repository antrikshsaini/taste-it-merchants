// Libraries
import React from "react"

// Components
import MenuCreator from "./components/MenuCreator"



const AddDish = props =>{
  const {rName} = props.location.state

  return(
    <div className="addDish">
      <div className="addDish__titleWrap">
        <p>Hi, {rName}. Let's customize your menu now</p>
        <h1>Add New Dish</h1>
      </div>
      
      <MenuCreator />
    </div>
  )
}


export default AddDish;
