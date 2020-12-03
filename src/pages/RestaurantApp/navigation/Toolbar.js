// Libraries
import React from 'react';
import {Link} from 'react-router-dom'

// Images
import SiteLogo from "../../../assets/img/logos/logo.svg"
import Icon from "../../../assets/img/icons/Icon"

// Others
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function refreshPage() {
    window.location.reload(false);
}


const Toolbar = props =>{
    return(
        <header className="toolbar">
            <nav className="toolbar__wrapper">
                {/* Toolbar Header Part(Logo and Close Button) */}
                <div className="toolbar__header">
                    <div onClick={refreshPage}>
                        <Link to="/"><img src={SiteLogo} alt="Logo" className="mobile-menu__logo" /></Link>
                    </div>
                    
                    <div onClick={() => props.setMenu(false)}>
                        <FontAwesomeIcon icon={faTimes} className="toolbar__closeIcon"/>
                    </div>
                </div>
                
                {/* Link Buttons */}
                <ul className="toolbar__menu">
                    <Tabs
                        orientation="vertical"
                        value={props.value}
                        onChange={props.handleChange}
                        indicatorColor="none"
                    >
                        <Tab 
                            label={<span>Active Orders</span>}
                            icon={<Icon name="activeOrders" />} 
                            to="/restaurant/activeOrders" 
                            component={Link} 
                            onClick={() => props.setMenu(false)} />

                        <Tab 
                            label={<span>Menu</span>} 
                            icon={ <Icon name="menu" />} 
                            to="/restaurant/menus" 
                            component={Link} 
                            onClick={() => props.setMenu(false)} />

                        <Tab 
                            label={<span>Order History</span>} 
                            icon={<Icon name="orderHistory" />} 
                            to="/restaurant/orderHistory" 
                            component={Link} 
                            onClick={() => props.setMenu(false)} /> 

                        <Tab 
                            label={<span>Account</span>} 
                            icon={<Icon name="account" />} 
                            to="/restaurant/account" 
                            component={Link} 
                            onClick={() => props.setMenu(false)} />

                        <Tab 
                            label={<span>Support</span>} 
                            icon={<Icon name="support" />} 
                            to="/restaurant/contact" 
                            component={Link} 
                            onClick={() => props.setMenu(false)} />
                    </Tabs>
                </ul> 
            </nav>
        </header>
    )
}

export default Toolbar