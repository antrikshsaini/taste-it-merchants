// Libraries
import React, {Component} from "react"
import axios from "axios"
import {getJwtToken} from "../../../../components/getJwt"

// MaterialUI
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button';

// Components
import ChoiceCreator from "./ChoiceCreator"

// Other
import {BASE_URL} from "../../../../config/config"
import whiteImg from "../../../../assets/img/white.png"
import { toast } from 'react-toastify';


var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class MenuCreator extends Component{
  state={
    dishName: '',
    dishPrice: '',
    description: '',
    cuisineType: [
      { choiceDescription: 'Indian', checked: false, pictureURL:'https://i.ibb.co/R91348L/Indian.png'},
      { choiceDescription: 'Vietnamese', checked: false, pictureURL:'https://i.ibb.co/nrDy9Wc/vietnamese.png'},
      { choiceDescription: 'Japanese', checked: false, pictureURL:'https://i.ibb.co/PxGXKvd/Japanese.png'},
      { choiceDescription: 'French', checked: false, pictureURL:'https://i.ibb.co/LRXR2DL/french.png'},
      { choiceDescription: 'Mexican', checked: false, pictureURL:'https://i.ibb.co/J274P4Y/Mexican.png'},
      { choiceDescription: 'Korean', checked: false, pictureURL:'https://i.ibb.co/pKQwt5q/Korean.png'},
      { choiceDescription: 'Chinese', checked: false, pictureURL:'https://i.ibb.co/DLJCdx9/chinese.png'},
      { choiceDescription: 'Thai', checked: false, pictureURL:'https://i.ibb.co/bK6CPYG/thai.png'},
    ],
    allergy: [
      { choiceDescription: 'No Allergens', checked: false, pictureURL:'https://i.ibb.co/hDBYYzk/good-heart.png'},
      { choiceDescription: 'Milk', checked: false, pictureURL:'https://i.ibb.co/3c2zNHw/milk.png'},
      { choiceDescription: 'Shellfish', checked: false, pictureURL:'https://i.ibb.co/d4jvWFm/crustacean-shellfish.png'},
      { choiceDescription: 'Tree Nuts', checked: false, pictureURL:'https://i.ibb.co/VDH0bMt/tree-nuts.png'},
      { choiceDescription: 'Fish', checked: false, pictureURL:'https://i.ibb.co/5rMtbNN/fish.png'},
      { choiceDescription: 'Eggs', checked: false, pictureURL:'https://i.ibb.co/sHC1Hbk/eggs.png'},
      { choiceDescription: 'Soybean', checked: false, pictureURL:'https://i.ibb.co/X3qmqnv/soybeans.png'},
      { choiceDescription: 'Peanuts', checked: false, pictureURL:'https://i.ibb.co/Dk5TzqD/peanuts.png'},
      { choiceDescription: 'Wheat', checked: false, pictureURL:'https://i.ibb.co/JB2sfgL/wheat.png'},
    ],
    dietType: [
      { choiceDescription: 'Anything', checked: false, pictureURL:'https://i.ibb.co/hDBYYzk/good-heart.png'},
      { choiceDescription: 'Vegetarian', checked: false, pictureURL:'https://i.ibb.co/1LHkS9V/vegetarian.png'},
      { choiceDescription: 'Gluten-Free', checked: false, pictureURL:'https://i.ibb.co/vkNvNyB/gluten-free.png'},
      { choiceDescription: 'Halal', checked: false, pictureURL:'https://i.ibb.co/S0wKSTm/halal.png'},
      { choiceDescription: 'Kosher', checked: false, pictureURL:'https://i.ibb.co/LkfB5Zc/kosher.png'},
      { choiceDescription: 'Diabetic', checked: false, pictureURL:'https://i.ibb.co/wzYnwgN/diabetic.png'},
      { choiceDescription: 'Vegan', checked: false, pictureURL:'https://i.ibb.co/SJQNVZq/vegan.png'},
      { choiceDescription: 'Organic', checked: false, pictureURL:'https://i.ibb.co/ph3FHq7/organic.png'}
    ],
    spicyLevel:  [
      { choiceDescription: 'Very High', checked: false, pictureURL:'https://i.ibb.co/JHrbsps/very-high.png'},
      { choiceDescription: 'High', checked: false, pictureURL:'https://i.ibb.co/jG56ncq/high.png'},
      { choiceDescription: 'Moderate', checked: false, pictureURL:'https://i.ibb.co/Y2k55tj/moderate.png'},
      { choiceDescription: 'Not Spicy', checked: false, pictureURL:'https://i.ibb.co/wph2BB8/not-spicy.png'},
    ],
    uploadImageSrc: "",
    redirect: false,
  }

  handleCusineTypeChange= choiceDescription =>{
    const target = this.state.cuisineType.map(function(e) { return e.choiceDescription }).indexOf(choiceDescription)
    let newChoices = JSON.parse(JSON.stringify(this.state.cuisineType))
    newChoices[target].checked = !newChoices[target].checked

    this.setState({
      cuisineType: newChoices
    })
  }

  handleAllergyChange= choiceDescription =>{
    const target = this.state.allergy.map(function(e) { return e.choiceDescription }).indexOf(choiceDescription)
    let newChoices = JSON.parse(JSON.stringify(this.state.allergy))
    newChoices[target].checked = !newChoices[target].checked

    this.setState({
      allergy: newChoices
    })
  }

  handleSpicyLevelChange= choiceDescription =>{
    const target = this.state.spicyLevel.map(function(e) { return e.choiceDescription}).indexOf(choiceDescription)
    
    let newChoices = JSON.parse(JSON.stringify(this.state.spicyLevel))
    newChoices[target].checked = !newChoices[target].checked

    this.setState({
      spicyLevel: newChoices
    })
  }

  handleDietTypeChange= choiceDescription =>{
    const target = this.state.dietType.map(function(e) { return e.choiceDescription }).indexOf(choiceDescription)
    let newChoices = JSON.parse(JSON.stringify(this.state.dietType))
    newChoices[target].checked = !newChoices[target].checked

    this.setState({
      dietType: newChoices
    })
  }
  
  handleNameInputChange = input => {
    this.setState({
      dishName: input
    })
  }

  handlePriceInputChange = input => {
    this.setState({
      dishPrice: input
    })
  }

  handleDescriptionInputChange = input => {
    this.setState({
      description: input
    })
  }

  handleChangeFile(e) {
    var files = e.target.files;
    var image_url = files.length===0 ? "" : createObjectURL(files[0]);
    this.setState({
      file: e.target.files[0],
      uploadImageSrc: image_url});
  }

  deleteFile(e) {
    this.setState({uploadImageSrc: ''});
  }

  // jump(){
  //   window.location.href = "http://localhost:3000/restaurant/menus"
  // }

  saveInfo = e => {
    const {dishName, dishPrice, description, file, cuisineType, allergy, dietType, spicyLevel} = this.state

    const bodyFormData = new FormData()
    bodyFormData.append('menuName', dishName)
    bodyFormData.append('price', dishPrice)
    bodyFormData.append('menuDescription', description)
    bodyFormData.append('image', file)

    const newChoices = []

    for(let i = 0; i<cuisineType.length; i++){
      if(cuisineType[i].checked){
        newChoices.push(cuisineType[i].choiceDescription)
      }
    }

    for(let i = 0; i<allergy.length; i++){
      if(allergy[i].checked){
        newChoices.push(allergy[i].choiceDescription)
      }
    }

    for(let i = 0; i<dietType.length; i++){
      if(dietType[i].checked){
        newChoices.push(dietType[i].choiceDescription)
      }
    }

    for(let i = 0; i<spicyLevel.length; i++){
      if(spicyLevel[i].checked){
        newChoices.push(spicyLevel[i].choiceDescription)
      }
    }

    e.preventDefault()

    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn")
    }

    toast('New dish has been added!');

    // Upload dishName, dishPrice, description
    axios({
      method: 'post',
      url: `${BASE_URL}/menus`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${jwt}` 
       }})
      .then((res)=>{
          
          for(let i = 0; i<newChoices.length; i++){
            // Upload choices
            axios
            .post(
              `${BASE_URL}/menus/choice`,{
                menuID: res.data.menuID,
                choiceDescription: newChoices[i]
              },{
                headers: {
                  Authorization: `${jwt}`
                }
              }
            )
          }
        })
      // .then(()=>{
      //   this.jump()
      // })
      .catch((err) => {

      })

  }

  render(){
    

    return(
        <form noValidate autoComplete="off" className="addDish__editor">

        <div className="addDish__metaWrap">
          <div className="addDish__imgWrap">
            <img src={this.state.uploadImageSrc || whiteImg} className="addDish__img" alt="Dish"/>

            <div className="addDish__editor-buttonWrap">
                <input accept="image/*" multiple type="file" className="input" id="upload-img"  onChange={e => this.handleChangeFile(e)} style={{display:'none'}}/>
                <label htmlFor="upload-img">
                    <Button className="addDish__editor-addButton" id="addButton" component="span">
                          Upload Image
                    </Button>
                </label>

                <Button onClick={e => this.deleteFile(e.target)} className="addDish__editor-deleteButton" id="deleteButton">Delete Image</Button>
            </div>
          </div>
          
        
        
          <div className="addDish__inputWrap">
          <TextField label="Dish Name" variant="outlined" onChange={e => this.handleNameInputChange(e.target.value)} className="addDish__editor-nameInput"/>

          <TextField
              label="Dish Price"
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              variant="outlined"
              onChange={e => this.handlePriceInputChange(e.target.value)}
              className="addDish__editor-priceInput"
          />

          <TextField
            label="Description"
            id="outlined-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            onChange={e => this.handleDescriptionInputChange(e.target.value)}
            className="addDish__editor-descInput"
          />
          </div>
        </div>

          <ChoiceCreator 
            cuisineType={this.state.cuisineType} 
            allergy={this.state.allergy} 
            dietType={this.state.dietType} 
            spicyLevel={this.state.spicyLevel}
            handleCusineTypeChange={this.handleCusineTypeChange} 
            handleAllergyChange={this.handleAllergyChange} 
            handleSpicyLevelChange={this.handleSpicyLevelChange} 
            handleDietTypeChange={this.handleDietTypeChange} 
          />

          <button onClick={e => this.saveInfo(e)} className="addDish__editor-saveButton">Add New Dish</button>
        </form>
    )}
}


export default MenuCreator
