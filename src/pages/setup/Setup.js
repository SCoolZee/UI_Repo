import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InstitutionSetup from './institutionSetup/InstitutionSetup';
import ClassesSetup from './classesSetup/ClassesSetup';
import { useStyles } from './SetupStyle';
import FeeStructure from './feesStructures/FeeStructure';

const Setup =() => {
  const classes = useStyles();

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant='scrollable' onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Institution Setup" value="1" />
            <Tab label="Classes Setup" value="2" />
            <Tab label="Fee Structures" value="3" />
          </TabList>
        </Box>
        <TabPanel className={classes.tabPanel} value="1"><InstitutionSetup/></TabPanel>
        <TabPanel className={classes.tabPanel} value="2"><ClassesSetup/></TabPanel>
        <TabPanel className={classes.tabPanel} value="3"><FeeStructure/></TabPanel>
      </TabContext>
    </Box>
  );
}

export default Setup;