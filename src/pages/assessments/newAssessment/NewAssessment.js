/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect } from 'react'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Box, Container, Button, Divider } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Autocomplete from '@mui/material/Autocomplete';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TableRow from '@mui/material/TableRow';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { useStyles, StyledTableCell, StyledTitleCell, StyledTitleHeaderCell } from '../AssessmentStyle';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Loading from '../../../components/loading/Loading';
import { eventNotificationMode } from '../../../constants/EventNotificationMode';
import { AccessDefinition } from '../../../constants/AccessDefinition/AccessDefinition';
import { loginContext } from '../../../components/context/Context';
import Custom_Button from '../../../components/reusableElements/Custom_Button';

function NewAssessment(params) {

  const classes = useStyles();
  const history = useHistory();

  let unmounted = false;
  const currentUserProfile =JSON.parse(localStorage.getItem('userDetail'))?.profile?.name;
  const accessDfn = AccessDefinition.find(definition => definition.route === window.location.pathname);

  const assessmentObjPermission = params.location.state.assessmentObjPermission;

  useEffect(() => {
    console.log(assessmentObjPermission)
    getAllClasses();
    getFacultyList();
  }, []);


  const [invalidList, setInvalidList] = React.useState([]);
  const [subjectList, setSubjectList] = React.useState([]);
  const [classlist, setClassList] = React.useState([]);
  const [duration, setDuration] = React.useState('')
  const [isPageLoading, setisPageLoading] = React.useState(false);
  const [assessmentData, setAssessmentData] = React.useState([]);
  const [assessmentName, setAssessmentName] = React.useState({});
  const [assessmentNotificationMode, setAssessmentNotificationMode] = React.useState({});
  const [assessmentOwner, setAssessmentOwner] = React.useState({});
  const [assessmentInstruction, setAssessmentInstruction] = React.useState({});
  const [allFacultyList, setAllFacultyList] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = useContext(loginContext);

  useEffect(() => {
    console.log(duration)
  }, [duration]);


  const getAllClasses = async () => {
    setisPageLoading(true);
    unmounted = false;
    let subjectList = [];
    let classSubList = []
    const source = axios.CancelToken.source();
    await axios.get(`${process.env.REACT_APP_SERVER}/current-year-classes-info/class`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length === 0) {
            toast(
              <span style={{ color: '#FF9900' }}>
                No classes are found. Please add!!
              </span>,
              {
                icon: <WarningRoundedIcon style={{ color: "#FF9900" }} />,
              }
            );
          }
          else {

            response.data.forEach(classData => {
              subjectList.push(...classData.divisions?.map(div => div.courses?.map(course => {return course.subject})));
              classSubList.push({ id: classData._id, name: classData.name, subjects: [...classData.divisions[0]?.courses?.map(course => { return course.subject?._id })] })
            });

            let uniqueSubjectList = [].concat.apply([], Object.values(subjectList));

            let finalList = uniqueSubjectList.reduce((uniqueList, b) => {
              if (!uniqueList.some(obj => obj._id === b._id)) {
                uniqueList.push(b)
              }
              return uniqueList
            }, [])

            setSubjectList(finalList);
            setClassList(classSubList);
          }
        }
      })
      .catch((error) => {
        console.log(error)
        if (!unmounted) {
          if (error.request?.status === 403) {
            localStorage.removeItem('userDetail');
            localStorage.removeItem('userToken');
            localStorage.removeItem('activeSubscription');
            history.replace('/login');
            history.go(0);
          }
        }
      })
      .finally(() => {
        setisPageLoading(false);
        return function () {
          unmounted = true;
          source.cancel("Cancelling in cleanup");
        };
      });
  }

  const getFacultyList = async () => {
    setAllFacultyList([])
    setisPageLoading(true);
    unmounted = false;
    const source = axios.CancelToken.source();
    await axios.get(`${process.env.REACT_APP_SERVER}/faculty-info/user`)
      .then((response) => {
        console.log(response.data);
        setAllFacultyList(response.data)
      })
      .catch((error) => {
        if (!unmounted) {
          if (error.request.status === 403) {
            setIsLoggedIn(false);
            localStorage.removeItem('userDetail');
            localStorage.removeItem('userToken');
            localStorage.removeItem('activeSubscription');
            history.replace('/login');
            history.go(0);
          }
        }
      })
      .finally(() => {
        setisPageLoading(false);
        return function () {
          unmounted = true;
          source.cancel("Cancelling in cleanup");
        };
      });
  }

  const handleAssessment = (dateTime, classId, subjectId) => {
    dateTime = !isNaN(dateTime) ? dateTime : null
    let tempAssessmentData = [];
    assessmentData.forEach(assess => {
      if (assess.classId === classId && assess.subjectId === subjectId) {
        // no logic to implement filter on 2 variables
      }
      else {
        tempAssessmentData.push(assess)
      }
    });
    setAssessmentData([...tempAssessmentData, { dateTime, classId, subjectId }]);

  }

  const dataValidation = () => {
    let tempInvalidList = [];
    let isValid = true;

    if (JSON.stringify(assessmentName) === JSON.stringify({})) {
      tempInvalidList.push('title');
      isValid = false
    }
    console.log(duration)

    if (duration !== '' && duration?.length !== 5) {
      tempInvalidList.push('duration');
      isValid = false
    }
    if(JSON.stringify(assessmentNotificationMode) === JSON.stringify({})){
      tempInvalidList.push('notificationMode')
      isValid = false
    }
    if(JSON.stringify(assessmentOwner) === JSON.stringify({})){
      tempInvalidList.push('owner')
      isValid = false
    }
    if (assessmentData.length === 0) {
      toast.error('No assessment scheduled.');
      isValid = false
    }
    if (!isValid) {
      setInvalidList([...tempInvalidList]);
      return
    }
    handleAssessmentStructure();
  }

  const handleAssessmentStructure = () => {
    let tempAssessmentData = [];
    let finalAssessmentDetails = [];
    assessmentData.forEach(assessment => {
      if (tempAssessmentData.findIndex(tempAssessment => tempAssessment.class === assessment.classId) >= 0) {
        tempAssessmentData.find(tempAssessment => tempAssessment.class === assessment.classId).details.push({
          subject: assessment.subjectId,
          dateTime: assessment.dateTime
        })
      }
      else {
        tempAssessmentData.push({
          class: assessment.classId,
          details: [{
            subject: assessment.subjectId,
            dateTime: assessment.dateTime
          }]
        })
      }
    });

    finalAssessmentDetails = {
      title: assessmentName.title,
      duration: duration,
      instruction: assessmentInstruction.instruction,
      notificationMode: assessmentNotificationMode.notificationMode,
      owner: assessmentOwner?.ownerId,
      exams: tempAssessmentData
    }

    console.log(finalAssessmentDetails);
    handleAssessmentSave(finalAssessmentDetails)
  }

  const handleAssessmentSave = async (finalAssessmentDetails) => {
    unmounted = false;
    setisPageLoading(true);
    const source = axios.CancelToken.source();
    await axios.post(`${process.env.REACT_APP_SERVER}/add-assessment/assessment`, {
      assessmentDetails: finalAssessmentDetails
    })
      .then((response) => {
        if (response.status === 200) {
          setisPageLoading(false);
          console.log('Returned');
          toast.success('Published')
          history.replace('/assessments')
        }
      })
      .catch((error) => {
        if (!unmounted) {
          if (error.request.status === 403) {
            localStorage.removeItem('userDetail');
            localStorage.removeItem('userToken');
            localStorage.removeItem('activeSubscription');
            history.replace('/login');
            history.go(0);
          }
          else {
            toast.error(error.response.data)
          }
        }
      })
      .finally(() => {
        setisPageLoading(false);
        return function () {
          unmounted = true;
          source.cancel("Cancelling in cleanup");
        };
      });
  }

  function formatTime(timeInput) {
    let intValidNum = timeInput.target.value;
    setDuration(intValidNum)
    console.log(intValidNum)
    if (intValidNum < 24 && intValidNum.length == 2) {
      timeInput.target.value = timeInput.target.value + ":";
      return false;
    }
    if (intValidNum == 24 && intValidNum.length == 2) {
      timeInput.target.value = timeInput.target.value.length - 2 + "0:";
      return false;
    }
    if (intValidNum > 24 && intValidNum.length === 2) {
      timeInput.target.value = "";
      return false;
    }
    if (intValidNum.length > 5) {
      timeInput.target.value = timeInput.target.value?.slice(0, -1)
    }

  }
  if (isPageLoading) {
    return (
      <Box style={{ top: '50%' }}>
        <Loading isPageLoading={isPageLoading} />
      </Box>
    )
  }
  else {
    return (
      <React.Fragment>
         <Box component="span" className={classes.hideButtons}>
          <Grid container spacing={5}>
            <Grid xs={6} md={6} justifyContent='flex-end' style={{ maxWidth: '46%', paddingTop: 10, marginBottom: '1.5%' }} className={classes.gridElement}>
              <Custom_Button variant='contained' size="medium" style={{ marginRight: 3 }} color='inherit' onClick={dataValidation} label={'Publish'} accessGranted={assessmentObjPermission.create}/>
            </Grid>
            <Grid xs={6} md={6} justifyContent='flex-start' style={{ maxWidth: '46%', paddingTop: 10, marginBottom: '1.5%' }} className={classes.gridElement}>
              <Custom_Button variant='contained' size="medium" color='error' style={{ marginRight: 3 }} onClick={() => { history.goBack() }} label={'Cancel'} accessGranted={assessmentObjPermission.create}/>
            </Grid>
          </Grid>
        </Box>
        <Typography className={classes.header}>
          Assessment :
        </Typography>
        <Container style={{ paddingTop: 30, backgroundColor: 'white' }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Box style={{ marginBottom: 20 }}>
                <Typography className={classes.label}>Title :</Typography>
                <TextField
                  style={{ flex: 1 }}
                  fullWidth
                  placeholder={`Assessment Title`}
                  helperText={!invalidList.includes('title') ? '' : "Title is required"}
                  error={invalidList.includes('title')}
                  onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'title')) }}
                  value={assessmentName.title || ''}
                  id="title"
                  onChange={(title) => { setAssessmentName({ title: title.target.value }) }}
                  variant="standard"
                />
              </Box>
              <Box style={{ marginBottom: 20 }}>
                <Typography className={classes.label}>Instructions :</Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Enter Instructions..."
                  onChange={(instruc) => { setAssessmentInstruction({ instruction: instruc.target.value }) }}
                  style={{ minWidth: '100%', maxWidth: '100%', minHeight: 143, height: 143 }}
                  value={assessmentInstruction.instruction || ''}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box style={{ marginBottom: 20 }}>
                <Typography className={classes.label}>Duration :</Typography>
                <TextField
                  style={{ flex: 1 }}
                  fullWidth
                  type="text" placeholder="HH:MM" onkeypress="formatTime(this)" MaxLength="8"
                  helperText={!invalidList.includes('duration') ? '' : "Invalid duration"}
                  error={invalidList.includes('duration')}
                  onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'duration')) }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  id="title"
                  onChange={(duration) => { formatTime(duration) }}
                  variant="standard"
                />
              </Box>
              <Box style={{ marginBottom: 20 }}>
                <Typography style={{ paddingRight: 10 }} className={classes.label}>Notification Mode :</Typography>
                <Autocomplete
                  style={{ minWidth: 250 }}
                  disabled={false}
                  options={eventNotificationMode || []}
                  getOptionLabel={(option) => option.label || ''}
                  value={eventNotificationMode.find(mode => mode.value === assessmentNotificationMode.notificationMode) || ''}
                  isOptionEqualToValue={(option, value) => option?.value === value}
                  onChange={(event) => { setAssessmentNotificationMode({ notificationMode: eventNotificationMode[event.target?.dataset?.optionIndex]?.value }) }}
                  id="disable-close-on-select"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      required
                      helperText={!invalidList.includes('notificationMode') ? '' : "Notification Mode is required"}
                      error={invalidList.includes('notificationMode')}
                      onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'notificationMode')) }}
                      fullWidth
                      id={`event-type`}
                      placeholder="Notification"
                    />)}
                />
              </Box>
              <Box style={{ marginBottom: 20 }}>
                <Typography style={{ paddingRight: 10 }} className={classes.label}>Owner :</Typography>
                <Autocomplete
                  style={{ minWidth: 250 }}
                  disabled={false}
                  options={allFacultyList || []}
                  getOptionLabel={(option) => option.name || ''}
                  value={allFacultyList.find(faculty => faculty._id === assessmentOwner.ownerId) || ''}
                  isOptionEqualToValue={(option, value) => option?._id === value?._id}
                  onChange={(event) => { setAssessmentOwner({ ownerId: allFacultyList[event.target?.dataset?.optionIndex]?._id }) }}
                  id="disable-close-on-select"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      required
                      helperText={!invalidList.includes('owner') ? '' : "Owner is required"}
                      error={invalidList.includes('owner')}
                      onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'owner')) }}
                      fullWidth
                      id={`owner`}
                      placeholder="Owner"
                    />)}
                />
              </Box>
            </Grid>
          </Grid>

          <Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
              <TableContainer sx={{ maxHeight: '100vh' }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTitleHeaderCell
                        align='center'
                        style={{ minWidth: 170 }}
                        stickyHeader
                      >
                        Subjects
                      </StyledTitleHeaderCell>
                      {classlist.map((column) => (
                        <StyledTableCell
                          key={column._id}
                          align='center'
                          style={{ minWidth: 100 }}
                        >
                          {column.name}
                        </StyledTableCell>
                      ))

                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subjectList.map((subject, index) => {
                      return (
                        <TableRow tabIndex={-1} key={subject._id} style={{ position: 'relative' }}>
                          <StyledTitleCell stickyHeader variant='head' key={subject._id} align='center' style={{ minWidth: 100 }}>
                            {subject.name}
                          </StyledTitleCell>
                          {classlist.map((classRec) => {
                            return (
                              <TableCell style={{ minWidth: 223 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimePicker
                                    disabled={!(classRec.subjects?.includes(subject._id))}
                                    value={assessmentData?.find(assess => (assess.classId === classRec.id && assess.subjectId === subject._id))?.dateTime || null}
                                    fullWidth
                                    onChange={(newValue) => { handleAssessment(new Date(newValue?.$d), classRec.id, subject._id) }}
                                    renderInput={(params) => (
                                      <TextField {...params}
                                        defaultValue=''
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </TableCell>)
                          })
                          }
                        </TableRow>
                      )
                    })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Container>
        <Toaster />
      </React.Fragment >
    )
  }
}

export default NewAssessment