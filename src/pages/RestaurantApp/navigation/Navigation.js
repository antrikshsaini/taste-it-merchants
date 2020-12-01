// Libraries
import React from 'react'
import {Route, Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

// MaterialUI
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

// Components
import Menus from '../menus/Menus'
import ActiveOrders from '../activeOrders/ActiveOrders'
import OrderHistory from '../orderHistory/OrderHistory'
import Contact from '../contact/Contact'
import Account from '../account/Account'
import MobileMenu from "./MobileMenu"

import MenuDetail from '../menus/MenuDetail';
import EditDish from '../menus/EditDish'
import AddDish from '../menus/AddDish'

// Images
import SiteLogo from "../../../assets/img/logos/logo.svg"
import Icon from "../../../assets/img/icons/Icon"


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
    width: '100%'
  },
  tabPanels: {
    width: '100%',
    backgroundColor: '#FFFCF5'
  }
}))


export default function Navigation() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
      <div className={classes.root} id="restaurantApp_wrap">

      <MediaQuery maxDeviceWidth={1679}>
        <MobileMenu handleChange={handleChange} value={value}/>
      </MediaQuery>

      <MediaQuery minDeviceWidth={1680}>
        <div className="navigation__wrapper">
          <Link to="/"><img src={SiteLogo} alt="tasteIt Logo" className="navigation__logo"/></Link>
          {/* Navigation Menu */}
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className="navigation"
            indicatorColor="none"
          >
            <Tab 
              label="Active Orders" 
              icon={<Icon name="activeOrders" />} 
              to="/restaurant/activeOrders" 
              component={Link} />
            <Tab 
              label="Menu" 
              icon={ <Icon name="menu" />} 
              to="/restaurant/menus" 
              component={Link} />
            <Tab 
              label="Order History" 
              icon={<Icon name="orderHistory" />} 
              to="/restaurant/orderHistory" 
              component={Link} /> 
            <Tab 
              label="Account" 
              icon={<Icon name="account" />} 
              to="/restaurant/account" 
              component={Link} />
            <Tab 
              label="Support" 
              icon={<Icon name="support" />} 
              to="/restaurant/contact" 
              component={Link} />
          </Tabs>
        </div>
      </MediaQuery>
        
        {/* Active Order panel */}
        <TabPanel value={value} index={0} className={classes.tabPanels}>
          <ActiveOrders />
        </TabPanel>

        {/* Menu panel */}
        <TabPanel value={value} index={1} className={classes.tabPanels}>
          <Route path="/restaurant/menus" exact component={Menus} />
          <Route path="/restaurant/menus/detail/:id" component={MenuDetail} />
          <Route path="/restaurant/menus/edit/:id"  component={EditDish} />
          <Route path="/restaurant/menus/add"  component={AddDish} />
        </TabPanel>

        {/* Order History panel */}
        <TabPanel value={value} index={2} className={classes.tabPanels}>
          <Route path="/restaurant/orderHistory" component={OrderHistory} />
          {/* <OrderHistory /> */}
        </TabPanel>

        {/* Account panel */}
        <TabPanel value={value} index={3} className={classes.tabPanels}>
          <Account />
        </TabPanel>

        {/* Contact panel */}
        <TabPanel value={value} index={4} className={classes.tabPanels}>
          <Route path="/restaurant/contact" component={Contact} />
          {/* <Contact /> */}
        </TabPanel> 

      </div>
  )
}
