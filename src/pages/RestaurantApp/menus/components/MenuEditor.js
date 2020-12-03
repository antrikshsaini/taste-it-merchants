// Libraries
import React, {Component} from "react"
import axios from "axios"

// MaterialUI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'

// Components
import ChoiceContainer from "./ChoiceContainer"
import Loading from "../../../../components/Loading"

// Other
import {getJwtToken} from "../../../../components/getJwt"
import {BASE_URL} from "../../../../config/config"
import whiteImg from "../../../../assets/img/white.png"

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class MenuEditor extends Component{

  state={
    id: this.props.id,
    name: this.props.dishName,
    price: this.props.dishPrice,
    description: this.props.dishDescription,
    choices: [],
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
    uploadImageSrc: `${BASE_URL}/menus/image/${this.props.id}`,
    isLoading: false
  }

  componentDidMount() {
    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn")
    }

    this.setState({
      isLoading: true
    })

    const cuisineOptions = [
      { choiceDescription: 'Indian', checked: false, pictureURL:'https://i.ibb.co/R91348L/Indian.png'},
      { choiceDescription: 'Vietnamese', checked: false, pictureURL:'https://i.ibb.co/nrDy9Wc/vietnamese.png'},
      { choiceDescription: 'Japanese', checked: false, pictureURL:'https://i.ibb.co/PxGXKvd/Japanese.png'},
      { choiceDescription: 'French', checked: false, pictureURL:'https://i.ibb.co/LRXR2DL/french.png'},
      { choiceDescription: 'Mexican', checked: false, pictureURL:'https://i.ibb.co/J274P4Y/Mexican.png'},
      { choiceDescription: 'Korean', checked: false, pictureURL:'https://i.ibb.co/pKQwt5q/Korean.png'},
      { choiceDescription: 'Chinese', checked: false, pictureURL:'https://i.ibb.co/DLJCdx9/chinese.png'},
      { choiceDescription: 'Thai', checked: false, pictureURL:'https://i.ibb.co/bK6CPYG/thai.png'},
    ]

    const allergyOptions = [
      { choiceDescription: 'No Allergens', checked: false, pictureURL:'https://i.ibb.co/hDBYYzk/good-heart.png'},
      { choiceDescription: 'Milk', checked: false, pictureURL:'https://i.ibb.co/3c2zNHw/milk.png'},
      { choiceDescription: 'Crustacean shellfish', checked: false, pictureURL:'https://i.ibb.co/d4jvWFm/crustacean-shellfish.png'},
      { choiceDescription: 'Tree nuts', checked: false, pictureURL:'https://i.ibb.co/VDH0bMt/tree-nuts.png'},
      { choiceDescription: 'Fish', checked: false, pictureURL:'https://i.ibb.co/5rMtbNN/fish.png'},
      { choiceDescription: 'Eggs', checked: false, pictureURL:'https://i.ibb.co/sHC1Hbk/eggs.png'},
      { choiceDescription: 'Soybean', checked: false, pictureURL:'https://i.ibb.co/X3qmqnv/soybeans.png'},
      { choiceDescription: 'Peanuts', checked: false, pictureURL:'https://i.ibb.co/Dk5TzqD/peanuts.png'},
      { choiceDescription: 'Wheat', checked: false, pictureURL:'https://i.ibb.co/JB2sfgL/wheat.png'},
    ]
      
    const dietTypeOptions = [
      { choiceDescription: 'Anything', checked: false, pictureURL:'https://i.ibb.co/hDBYYzk/good-heart.png'},
      { choiceDescription: 'Vegetarian', checked: false, pictureURL:'https://i.ibb.co/1LHkS9V/vegetarian.png'},
      { choiceDescription: 'Gluten-Free', checked: false, pictureURL:'https://i.ibb.co/vkNvNyB/gluten-free.png'},
      { choiceDescription: 'Halal', checked: false, pictureURL:'https://i.ibb.co/S0wKSTm/halal.png'},
      { choiceDescription: 'Kosher', checked: false, pictureURL:'https://i.ibb.co/LkfB5Zc/kosher.png'},
      { choiceDescription: 'Diabetic', checked: false, pictureURL:'https://i.ibb.co/wzYnwgN/diabetic.png'},
      { choiceDescription: 'Vegan', checked: false, pictureURL:'https://i.ibb.co/SJQNVZq/vegan.png'},
      { choiceDescription: 'Organic', checked: false, pictureURL:'https://i.ibb.co/ph3FHq7/organic.png'}
    ]
      
    const spicyLevelOptions = [
      { choiceDescription: 'Very High', checked: false, pictureURL:'https://i.ibb.co/JHrbsps/very-high.png'},
      { choiceDescription: 'High', checked: false, pictureURL:'https://i.ibb.co/jG56ncq/high.png'},
      { choiceDescription: 'Moderate', checked: false, pictureURL:'https://i.ibb.co/Y2k55tj/moderate.png'},
      { choiceDescription: 'Not Spicy', checked: false, pictureURL:'https://i.ibb.co/wph2BB8/not-spicy.png'},
    ]
    
    
    axios
      .get(`${BASE_URL}/menus/choices/${this.props.id}`, {
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

        this.setState({
          cuisineType: cuisineOptions,
          allergy: allergyOptions,
          dietType: dietTypeOptions,
          spicyLevel: spicyLevelOptions,
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token");
        // this.props.history.push("/signIn");
      })
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
      name: input
    })
  }

  handlePriceInputChange = input => {
    this.setState({
      price: input
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



  saveInfo = e => {
    const {id, name, price, description, file, cuisineType, allergy, dietType, spicyLevel} = this.state

    e.preventDefault()

    const jwt = getJwtToken()
    if (!jwt) {
      this.props.history.push("/signIn")
    }

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

    const bodyFormData = new FormData()
    bodyFormData.append('menuName', name)
    bodyFormData.append('price', price)
    bodyFormData.append('menuDescription', description)
    bodyFormData.append('image', file)

    axios({
        method: 'put',
        url: `${BASE_URL}/menus/${id}`,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${jwt}` 
         }})
      .then((res)=>{
      })
      .catch((err) => {
      })

    axios
      .put(`${BASE_URL}/menus/choices/deactivateChoices`,{
          menuID: id
        },{
          headers: {
            Authorization: `${jwt}`
          }
        })
      .then((res)=>{
        for(let i = 0; i<newChoices.length; i++){
          // Upload choices
          axios
          .post(
            `${BASE_URL}/menus/choice`,{
              menuID: id,
              choiceDescription: newChoices[i]
            },{
              headers: {
                Authorization: `${jwt}`
              }
            }
          )
        }
      })
      .catch((err) => {

      })
  }

  render(){

    return(
        <form noValidate autoComplete="off" className="editDish__editor">
          
          <div className="editDish__metaWrap">
            <div className="editDish__imgWrap">
              <img src={this.state.uploadImageSrc || whiteImg}  className="editDish__img" alt="Dish" />

              <div className="editDish__editor-buttonWrap">
                  <input accept="image/*" multiple type="file" className="input" id="upload-img"  onChange={e => this.handleChangeFile(e)} style={{display:'none'}}/>
                  <label htmlFor="upload-img">
                      <Button  className="editDish__editor-addButton" id="addButton"  component="span">
                            Upload Image
                      </Button>
                  </label>

                  <Button onClick={e => this.deleteFile(e.target)} className="editDish__editor-deleteButton" id="deleteButton">Delete Image</Button>
              </div>
            </div>
            

            <div className="editDish__inputWrap">
              <TextField label="Dish Name" variant="outlined" defaultValue={this.state.name} onChange={e => this.handleNameInputChange(e.target.value)}   className="editDish__editor-nameInput" />

              <TextField
                  variant="outlined"
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  defaultValue={this.state.price}
                  onChange={e => this.handlePriceInputChange(e.target.value)}
                  label="Dish Price"
                  className="editDish__editor-priceInput"
              />

              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                defaultValue={this.state.description}
                onChange={e => this.handleDescriptionInputChange(e.target.value)}
                label="Description"
                className="editDish__editor-descInput"
              />
            </div>
          </div>
          

          {
            this.state.isLoading ? <Loading />
                      : <ChoiceContainer cuisineType={this.state.cuisineType}  
                                         allergy={this.state.allergy}
                                         dietType={this.state.dietType}
                                         spicyLevel={this.state.spicyLevel}
                                         handleCusineTypeChange={this.handleCusineTypeChange} 
                                          handleAllergyChange={this.handleAllergyChange} 
                                          handleSpicyLevelChange={this.handleSpicyLevelChange} 
                                          handleDietTypeChange={this.handleDietTypeChange} 
                        />
          }
          
          <button onClick={e => this.saveInfo(e)} className="editDish__editor-saveButton">Save Dish</button>
        </form>
    )}
}


export default MenuEditor
