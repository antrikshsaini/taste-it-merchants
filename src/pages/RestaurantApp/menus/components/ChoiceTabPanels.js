// Libraries
import React from "react"
import PropTypes from 'prop-types'

// MaterialUI
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import StopRoundedIcon from '@material-ui/icons/StopRounded';


const TabPanel = (props) => {
  const { value, index, choices, handleChange,...other } = props
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <List>
          {
            choices.map(
              (choice) => {
                const {choiceDescription, checked, pictureURL,index} = choice
                const choiceIcon = <img src={pictureURL} className="choiceIcon" alt="Choice"/>
                
                return (
                  <ListItem>
                    {choiceIcon}
                    <FormControlLabel
                      index={index}
                      label={choiceDescription}
                      value={choiceDescription}
                      control={<Checkbox color="primary" icon={<StopRoundedIcon />} />}
                      labelPlacement="start"
                      onChange={e => handleChange(e.target.value)}
                      checked={checked}
                    />
                  </ListItem>
                )
              }
            )
          }
        </List>
      )}
    </div>
  )
}


export default TabPanel