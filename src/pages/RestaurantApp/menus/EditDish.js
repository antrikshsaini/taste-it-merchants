// Libraries
import React from "react"


// Components
import MenuEditor from "./components/MenuEditor"



const EditDish = props =>{
  const {id, dishName, dishDescription, dishPrice, rName} = props.location.state

  return(
    <div className="editDish">
      <div className="editDish__titleWrap">
        <p>Hi, {rName}. Let's customize your menu now</p>
        <h1>Edit Dish</h1>
      </div>

      <MenuEditor id={id} dishName={dishName} dishDescription={dishDescription} dishPrice={dishPrice}/>
    </div>
  )
}


export default EditDish
