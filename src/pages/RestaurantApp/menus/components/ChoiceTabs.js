// Libraries
import React from "react"

// MaterialUI
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

// Components
import TabPanel from './ChoiceTabPanels'


const ChoiceTabs = props =>{
  const [value, setValue] = React.useState(0)
  const { cuisineType, allergy, dietType, spicyLevel, handleCusineTypeChange, handleAllergyChange, handleSpicyLevelChange, handleDietTypeChange } = props


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  return(
    <div>
        <Tabs variant="scrollable" value={value} onChange={handleChange} indicatorColor="none">
          <Tab label="Cuisine Type" style={{ fontFamily: 'NexaBold', fontSize: '20px', textTransform: 'none'}} />
          <Tab label="Allergy"  style={{ fontFamily: 'NexaBold', fontSize: '20px', textTransform: 'none'}}  />
          <Tab label="Diet Type"  style={{ fontFamily: 'NexaBold', fontSize: '20px', textTransform: 'none'}}  />
          <Tab label="Spiciness"  style={{ fontFamily: 'NexaBold', fontSize: '20px', textTransform: 'none'}}  />
        </Tabs>
      
      <TabPanel index={0} value={value} choices ={cuisineType} handleChange={handleCusineTypeChange}/>
      <TabPanel index={1} value={value} choices ={allergy} handleChange={handleAllergyChange}/>
      <TabPanel index={2} value={value} choices ={dietType} handleChange={handleDietTypeChange}/>
      <TabPanel index={3} value={value} choices ={spicyLevel} handleChange={handleSpicyLevelChange}/>
    </div>
  )
}

export default ChoiceTabs