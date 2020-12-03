// Libraries
import React  from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'
import { getJwtToken } from "../../../components/getJwt"

// MaterialUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {makeStyles} from '@material-ui/core/styles'
import TextField  from "@material-ui/core/TextField"
import MenuItem from '@material-ui/core/MenuItem'

// Other
import {BASE_URL} from "../../../config/config"

const getStyles = makeStyles(theme => ({
  media: {
    'height': '0',
    'paddingTop': '56.25%' // 16:9
  },
}))

// Delete menu
const deleteMenu = (menuID) =>{
  const jwt = getJwtToken()
  if (!jwt) {
    // this.props.history.push("/signIn")
  }

  axios
    .put(`${BASE_URL}/menus/${menuID}`,{
      isActive: "false"
    }, {
      headers: { Authorization: `${jwt}` }
    })
    .then((res)=>{
      
    })
    .catch((err) => {
      // localStorage.removeItem("jwt-token")
      // this.props.history.push("/signIn")
      
    })
}


const getChoices = (menuID) =>{
  const jwt = getJwtToken()
    // if (!jwt) {
    //   this.props.history.push("/signIn")
    // }

    // this.setState({
    //   isLoading: true
    // })

    const cuisineOptions = [
      { choiceDescription: 'Indian', checked: false},
      { choiceDescription: 'Vietnamese', checked: false},
      { choiceDescription: 'Japanese', checked: false},
      { choiceDescription: 'French', checked: false},
    ]

    const allergyOptions = [
      { choiceDescription: 'No Allergens', checked: false},
      { choiceDescription: 'Milk', checked: false},
      { choiceDescription: 'Crustacean shellfish', checked: false},
      { choiceDescription: 'Tree nuts', checked: false},
      { choiceDescription: 'Fish', checked: false},
    ]
      
    const dietTypeOptions = [
      { choiceDescription: 'Anything', checked: false},
      { choiceDescription: 'Vegetarian', checked: false},
      { choiceDescription: 'Gluten-Free', checked: false}
    ]
      
    const spicyLevelOptions = [
      { choiceDescription: 'Very High', checked: false},
      { choiceDescription: 'High', checked: false},
      { choiceDescription: 'Moderate', checked: false},
      { choiceDescription: 'Not Spicy', checked: false},
    ]
    

    axios
      .get(`${BASE_URL}/menus/choices/${menuID}`, {
        headers: { Authorization: `${jwt}` },
      })
      .then((res) => {
        // Cuisine
        const selectedCuisineType = res.data.filter( function( choice ) {
          return choice.category === "Cuisines"
        })

        for (let i = 0; i < selectedCuisineType.length; i++) {
          const index = cuisineOptions.findIndex(option => option.choiceDescription === selectedCuisineType[i].choiceDescription)

          if(index !== -1){
            cuisineOptions[index].checked = true
          }
        }

        // Allergy
        const selectedAllergy = res.data.filter( function( choice ) {
          return choice.category === "Allergens"
        })

        for (let i = 0; i < selectedAllergy.length; i++) {
          const index = allergyOptions.findIndex(option => option.choiceDescription === selectedAllergy[i].choiceDescription)

          if(index !== -1){
            allergyOptions[index].checked = true
          }
        }

        // Diet Type
        const selectedDietType = res.data.filter( function( choice ) {
          return choice.category === "Diet Types"
        })

        for (let i = 0; i < selectedDietType.length; i++) {
          const index = dietTypeOptions.findIndex(option => option.choiceDescription === selectedDietType[i].choiceDescription)

          if(index !== -1){
            dietTypeOptions[index].checked = true
          }
        }

        // Spicy Level
        const selectedSpicyLevel = res.data.filter( function( choice ) {
          return choice.category === "Spiciness"
        })

        for (let i = 0; i < selectedSpicyLevel.length; i++) {
          const index = spicyLevelOptions.findIndex(option => option.choiceDescription === selectedSpicyLevel[i].choiceDescription)

          if(index !== -1){
            spicyLevelOptions[index].checked = true
          }
        }
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token");
        // this.props.history.push("/signIn");
        
      })
}


const MenuDetail = props =>{
  const classes = getStyles()

  const {id, name, description, price, rName, status} = props.location.state

  getChoices(id)
  
  // Number => dollar currency format
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'USD'
  })


  return(
    <div className="menuDetail">
      <div className="menuDetail__titleWrap">
        <p>Hi, {rName}. Let's customize your menu now</p>
        <h2>Dish Details</h2>
      </div>
      

      <Card>
        <div className="menuDetail__picDescWrap">
          <CardMedia image={`${BASE_URL}/menus/image/${id}`}  className={classes.media}  />
          <CardContent>
            <div className="menuDetail__nameWrap">
              <h3>Dish Name</h3>
              <h2>{name}</h2>
            </div>
            
            <div className="menuDetail__descWrap">
              <h3>Description</h3>
              <p>{description}</p>
            </div>
            
            <div className="menuDetail__priceWrap">
              <h3>Price</h3>
              <h2>{formatter.format(price)}</h2>
            </div>

            <TextField
              select
              variant="outlined"
              defaultValue={status}
              >
              <MenuItem key='0' value='0'>Sold Out</MenuItem>
              <MenuItem key='1' value='1'>Available</MenuItem>
            </TextField>
          </CardContent>
        </div>
        
        {/* <ChoiceContainer choices={choices} /> */}
        <div className="menuDetail__buttonWrap">
          <Link 
            to={{
              pathname:`/restaurant/menus/edit/${id}`,
              state: {
                id: id,
                dishName: name,
                dishDescription: description,
                dishPrice: price,
                rName: rName
              }}}
              className="menuDetail__editButton"
          >
            <button>Edit Dish</button>
          </Link>
          
          <button onClick={() => deleteMenu(id)} className="menuDetail__removeButton">Remove Dish</button>
          </div>
      </Card>
    </div>
  )
}


export default MenuDetail
