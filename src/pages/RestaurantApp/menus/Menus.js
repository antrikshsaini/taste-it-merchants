// Libraries
import React, { Component } from "react"
import axios from 'axios'
import { getJwtToken } from "../../../components/getJwt"
import {Link} from 'react-router-dom';

// MaterialUI
import { TextField } from "@material-ui/core"
import MenuItem from '@material-ui/core/MenuItem'
import InputAdornment from '@material-ui/core/InputAdornment';

// Components
import MenuCard from "./components/MenuCard"

// Other
import {BASE_URL} from "../../../config/config"
import Sort from "../../../assets/img/icons/sort.svg"
import Search from "../../../assets/img/icons/search.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class Menus extends Component {
  state = {
    restaurant: [],
    menus: [],
    originalArray: [], // This array is used for keyword search
    sortBy: 1,
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

    axios
      .get(`${BASE_URL}/restaurants`, {
        headers: { Authorization: `${jwt}` }
      })
      .then((res) => {
        this.setState({
          restaurant: res.data[0],
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
      })

    axios
      .get(`${BASE_URL}/menus/all`, {
        headers: { Authorization: `${jwt}` }
      })
      .then((res) => {
        
        this.setState({
          menus: res.data,
          originalArray: res.data,
          isLoading: false
        })
      })
      .catch((err) => {
        // localStorage.removeItem("jwt-token")
        // this.props.history.push("/signIn")
      })
  }


  // Sorting Menus
  onSortingChange = (input) => {
    this.setState({
      sortBy: input
    })

    if (input===1){
      // Sort By: Latest
      const newArray = this.state.menus.sort(function(a, b) {
        var dateA = new Date(a.createdAt)
        var dateB = new Date(b.createdAt)
        
        return dateA - dateB
      })

      this.setState({
          menus: newArray
      })

    }else if(input===2){
      // Sort By: Oldest
      const newArray = this.state.menus.sort(function(a, b) {
        var dateA = new Date(a.createdAt)
        var dateB = new Date(b.createdAt)
        
        return dateB - dateA
      })

      this.setState({
          menus: newArray
      })

    }else if(input===3){
      // Sort By: ABC
      const newArray = this.state.menus.sort(function(a, b) {
        if (a.menuName < b.menuName) {
            return -1
        } else {
            return 1
        }
      })

      this.setState({
          menus: newArray
      })
    }
  }


  //  Key word Search
  keyWordSearch = (keyword) =>{
    var newArray = this.state.originalArray.filter(function(item){
      if ((item.menuName).indexOf(keyword) >= 0) return true
    })

    this.setState({
      menus: newArray
    })
  }


  render() {
    const rName = this.state.restaurant.restaurantName
    const sortBy = this.state.sortBy

    return (
      <div className="menus">
      {/* <Route exact path="/restaurant/menus"> */}
        <div className="menus__titleWrap">
          <p>Hi, {rName}. Let's customize your menu now</p>
          <h1>Menu</h1>
        </div>

        <div  className="menus__menuListWrap">
          <div  className="menus__functionsWrap">
          {/* Search Field */}
          <TextField 
            className="menus__searchInput"
            onChange={e => this.keyWordSearch(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><img src={Search} className="menus__searchIcon" alt="Search"/></InputAdornment>,
            }}
            placeholder='Search for a dish'
          />

          {/* "Sort By" Drop downs */}
          <TextField 
            className="menus__sortOptions"
            select
            value={sortBy}
            onChange={e => this.onSortingChange(e.target.value)}
            variant="outlined"
          >
            <MenuItem key='1' value='1'><img src={Sort} alt="Arrow Icon" className="menus__arrowIcon"/><p>Sort By: Latest</p></MenuItem>
            <MenuItem key='2' value='2'><img src={Sort} alt="Arrow Icon" className="menus__arrowIcon"/><p>Sort By: Oldest</p></MenuItem>
            <MenuItem key='3' value='3'><img src={Sort} alt="Arrow Icon" className="menus__arrowIcon"/><p>Sort By: ABC</p></MenuItem>
          </TextField>


          {/* "Add New Dish "Button */}
          <Link className="menus__addButton" to={{
              pathname:`/restaurant/menus/add`,
              state: {
                rName: rName
              }}}>
            <button ><FontAwesomeIcon icon={faPlus} className="menus__plusIcon"/>Add New Dishes</button>
          </Link>
          </div>



          {/* Menu Cards */}
          <div className="menus__cardWrap">
            {this.state.menus.map(
                menu => {
                  const {menuID, menuName, menuDescription, price, isActive} = menu
                  return (
                    <MenuCard 
                      key={menuID}
                      id={menuID}
                      name={menuName}
                      menuDescription={menuDescription}
                      price={price}
                      rName={rName}
                      status={isActive}
                    />
                  )
                }
              )}
          </div>

          <button className="menus__loadButton">Load More</button>
        </div>

        {/* </Route> */}
        {/* <Route path="/restaurant/menus/detail/:id" component={MenuDetail} />
        <Route path="/restaurant/menus/edit/:id"  component={EditDish} />
        <Route path="/restaurant/menus/add"  component={AddDish} /> */}
      </div>

    )
  }
}
export default Menus
