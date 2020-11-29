// Libraries
import React from "react"
import PropTypes from 'prop-types'

// MaterialUI
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

// Others
import uncheck from "../../../../assets/img/icons/unchecked.png"
import check from "../../../../assets/img/icons/checked.png"

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
                const choiceIcon = <img src={pictureURL} className="choiceIcon" alt="Choice" id={`choiceIcon__${choiceDescription}`}/>
                
                return (
                  <ListItem>
                    {choiceIcon}
                    <FormControlLabel
                      index={index}
                      label={choiceDescription}
                      value={choiceDescription}
                      control={<Checkbox icon={<img src={uncheck} style={{width: '24px'}} />}  checkedIcon={<img src={check} style={{width: '24px'}} />} />}
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