/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from 'react';
import { Box, Card, Typography, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, GridCellEditStopReasons } from '@mui/x-data-grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { useStyles } from './AssessmentDetailStyle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { OBJECT } from '../../../constants/ObjectNames/documentObjNames';
import Loading from '../../../components/loading/Loading';
import Custom_Button from '../../../components/reusableElements/Custom_Button';
import { formateTime } from '../../../components/commonController/commonController';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { assessmentColumns } from './AssessmentTable';

function AssessmentDetails(params) {
    const history = useHistory();
    const classes = useStyles();

    let unmounted = false;
    const [isPageLoading, setisPageLoading] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [assessmentObjPermission, setAssessmentObjPermission] = React.useState({});
    const [assessmentDetails, setAssessmentDetails] = React.useState({});
    const [tempAssessmentDetails, setTempAssessmentDetails] = React.useState({});
    const [invalidList, setInvalidList] = React.useState([]);
    const [expanded, setExpanded] = React.useState('');
    const [allFacultyList, setAllFacultyList] = React.useState([]);

    useEffect(() => {
        getFacultyList()
        getAssessmentDetail(params.match.params.id)
    }, [])

    const getAssessmentDetail = async (assessmentId) => {
        setisPageLoading(true)
        unmounted = false;
        const source = axios.CancelToken.source();
        await axios.get(`${process.env.REACT_APP_SERVER}/get-assessment-by-id/${OBJECT.ASSESSMENT}/${params.match.params.id}`)
            .then((response) => {
                console.log(response.data)
                setAssessmentDetails(response.data.assessment)
                setAssessmentObjPermission(response.data.accessDefination)
                setTempAssessmentDetails(response.data.assessment)
                setExpanded(response.data.assessment?.exams[0]?.class?._id)
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
                }
            })
            .finally(() => {
                setisPageLoading(false)
                return function () {
                    unmounted = true;
                    source.cancel("Cancelling in cleanup");
                };
            })
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

    function formatTime(timeInput) {
        let intValidNum = timeInput.target.value;
        setAssessmentDetails({ ...assessmentDetails, duration: intValidNum })
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

    const handleResultEditorsList = (classId, subjectId) => {
        let editorsList = [];
        let requestedClassSections = assessmentDetails.exams?.find(exam => exam.class?._id?.toString() === classId?.toString())?.class?.divisions
        let leadInstructorsList = requestedClassSections?.map(section => { return section.leadInstructor })
        editorsList.push([...leadInstructorsList])
        let instructorList = requestedClassSections?.map(section => { return section?.courses?.find(course => course.subject === subjectId)?.instructor })
        editorsList.push([...instructorList])
        return editorsList?.flat();
    }

    const handleRowEditCommit = React.useCallback(
        (params) => {
            updateExamDates(params)
        },
        []
    );

    const updateExamDates = (editedData) => {
        console.log(editedData) 
        const { id, field, value } = editedData;
        let tempAssessment = { ...assessmentDetails }
        console.log(id)
        console.log(tempAssessment)
        let examToEditList = tempAssessment.exams?.map(exam => {return exam.details.find(detail => detail.subject._id === id)});
        console.log(examToEditList);
        let examToEdit = examToEditList?.find(exam => exam.subject?.Id?.toString() === id?.toString());
        console.log(examToEdit)
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
                            <Custom_Button variant='contained' size="medium" style={{ marginRight: 3 }} color='inherit' onClick={() => { isEditMode ? setIsEditMode(false) : setIsEditMode(true) }} label={isEditMode ? 'Save' : 'Edit'} accessGranted={assessmentObjPermission.edit} />
                            <Custom_Button variant='contained' size="medium" style={{ marginLeft: 3 }} color='inherit' disabled={!isEditMode} onClick={() => {
                                setIsEditMode(false)
                                setAssessmentDetails(tempAssessmentDetails)
                            }} label={'Cancel'} accessGranted={assessmentObjPermission?.edit} />
                        </Grid>
                        <Grid xs={6} md={6} justifyContent='flex-start' style={{ maxWidth: '46%', paddingTop: 10, marginBottom: '1.5%' }} className={classes.gridElement}>
                            <Custom_Button variant='outlined' size="medium" color='error' style={{ marginRight: 3 }} onClick={() => { }} label={'Delete'} accessGranted={assessmentObjPermission.delete} />
                            <Button variant='contained' size="medium" color="success" disabled={isEditMode} style={{ marginLeft: 3 }} onClick={() => { }}>Send Remainder</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Typography className={classes.header}>
                    Details :
                </Typography>
                <Grid container style={{ padding: 5, width: '100%', margin: 0, justifyContent: 'space-between' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Card style={{ width: '49%', paddingLeft: 8 }}>
                        <Grid item xs={6}>
                            <Box style={{ margin: 5 }}>
                                <Typography className={classes.label}>Title :</Typography>
                                <TextField
                                    className={classes.inputDesign}
                                    style={{ flex: 1, width: 520 }}
                                    fullWidth
                                    InputProps={{
                                        readOnly: !isEditMode,
                                        disableUnderline: !isEditMode,
                                    }}
                                    value={assessmentDetails.title}
                                    type="text" placeholder="Assessment Title"
                                    helperText={!invalidList.includes('title') ? '' : "Title is required"}
                                    error={invalidList.includes('title')}
                                    onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'title')) }}
                                    id="title"
                                    onChange={(title) => { setAssessmentDetails({ ...assessmentDetails, title: title.target.value }) }}
                                    variant={isEditMode ? "outlined" : "standard"}
                                />
                            </Box>
                            <Box style={{ marginBottom: 20 }}>
                                <Typography className={classes.label}>Instructions :</Typography>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    readOnly={!isEditMode}
                                    InputProps={{
                                        readOnly: !isEditMode,
                                        disableUnderline: !isEditMode,
                                    }}
                                    placeholder="Instructions"
                                    onChange={(inst) => { setAssessmentDetails({ ...assessmentDetails, instruction: inst.target.value }) }}
                                    style={{ minWidth: 'auto', width: '531px', maxWidth: '531px', minHeight: 225, height: 225, border: !isEditMode ? 'none' : '', outline: '1px solid grey', fontFamily: 'sans-serif', marginTop: 5 }}
                                    value={assessmentDetails.instruction || ''}

                                />
                            </Box>
                        </Grid>
                    </Card>
                    <Card style={{ width: '49%', paddingLeft: 3, padding: 5, display: 'grid' }}>
                        <Grid item xs={6}>
                            <Box style={{ margin: 5 }}>
                                <Typography className={classes.label}>Owner :</Typography>
                                {!isEditMode && <TextField
                                    className={classes.inputDesign}
                                    style={{ flex: 1, width: 520 }}
                                    fullWidth
                                    InputProps={{
                                        readOnly: !isEditMode,
                                        disableUnderline: !isEditMode,
                                    }}
                                    value={assessmentDetails.owner?.name}
                                    type="text" placeholder="Assessment Owner"
                                    helperText={!invalidList.includes('owner') ? '' : "Owner is required"}
                                    error={invalidList.includes('owner')}
                                    onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'owner')) }}
                                    id="title"
                                    variant={isEditMode ? "outlined" : "standard"}
                                />}
                                {isEditMode && <Autocomplete
                                    style={{ flex: 1, width: 520 }}
                                    disabled={false}
                                    fullWidth
                                    options={allFacultyList || []}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={assessmentDetails.owner}
                                    isOptionEqualToValue={(option, value) => option?._id === value}
                                    onChange={(event) => { setAssessmentDetails({ ...assessmentDetails, owner: allFacultyList[event.target?.dataset?.optionIndex] }) }}
                                    id="disable-close-on-select"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            required
                                            helperText={!invalidList.includes('owner') ? '' : "Owner is required"}
                                            error={invalidList.includes('owner')}
                                            onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'owner')) }}
                                            fullWidth
                                            id={`event-type`}
                                            placeholder="Owner"
                                        />)}
                                />}
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ margin: 5 }}>
                                <Typography className={classes.label}>Start Date/Time :</Typography>
                                <TextField
                                    className={classes.inputDesign}
                                    style={{ flex: 1, width: 520 }}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true,
                                    }}
                                    value={params.location?.state?.startDateTime.toDateString() + ', ' + formateTime(params.location?.state?.startDateTime)?.strTime}
                                    type="text" placeholder="Assessment Start Date/Time"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    id="startDateTime"
                                    variant={"standard"}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ margin: 5 }}>
                                <Typography className={classes.label}>End Date/Time :</Typography>
                                <TextField
                                    className={classes.inputDesign}
                                    style={{ flex: 1, width: 520 }}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true,
                                    }}
                                    value={params.location?.state?.endDateTime.toDateString() + ', ' + formateTime(params.location?.state?.endDateTime)?.strTime}
                                    type="text" placeholder="Assessment End Date/Time"
                                    id="endDateTime"
                                    variant={"standard"}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ margin: 5 }}>
                                <Typography className={classes.label}>Duration :</Typography>
                                <TextField
                                    className={classes.inputDesign}
                                    style={{ flex: 1, width: 520 }}
                                    fullWidth
                                    InputProps={{
                                        readOnly: !isEditMode,
                                        disableUnderline: !isEditMode,
                                    }}
                                    onChange={(duration) => { formatTime(duration) }}
                                    value={assessmentDetails.duration}
                                    type="text" placeholder="HH:MM" MaxLength="8"
                                    helperText={!invalidList.includes('duration') ? '' : "Invalid duration"}
                                    error={invalidList.includes('duration')}
                                    onFocus={() => { setInvalidList(invalidList.filter(value => value !== 'duration')) }}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    id="title"
                                    variant={isEditMode ? "outlined" : "standard"}
                                />
                            </Box>
                        </Grid>
                    </Card>
                </Grid>
                <Typography className={classes.header}>
                    Classes :
                </Typography>
                {assessmentDetails.exams?.length > 0 && assessmentDetails.exams?.map((exam) => {
                    return (
                        <React.Fragment >
                            <Card style={{ height: 44, padding: 10, margin: '5px 5px 0px 5px', backgroundColor: '#e0e0e0', fontWeight: 900 }}>
                                {exam.class.name}
                                <span style={{ float: 'right' }}>
                                    {expanded !== exam.class._id && <ArrowDropDownIcon style={{ cursor: 'pointer' }} onClick={() => { setExpanded(exam.class._id) }} />}
                                    {expanded === exam.class._id && <ArrowDropUpIcon style={{ cursor: 'pointer' }} />}
                                </span>
                            </Card>
                            <Card style={{ height: 'auto', margin: '0px 5px 5px 5px', display: expanded !== exam.class._id ? 'none' : '' }}>
                                <div style={{ height: 300, width: '100%', overflow: 'hidden' }}
                                    className={classes.tableHead}>
                                    <DataGrid
                                        rows={exam.details?.map(detail => { return { id: detail.subject?._id, subject: detail.subject?.name, dateTime: new Date(detail.dateTime)?.toDateString() + ', ' + formateTime(new Date(detail.dateTime))?.strTime, actions: 'actions', resultEditors: handleResultEditorsList(exam.class._id, detail.subject?._id) } })}
                                        columns={assessmentColumns}
                                        isCellEditable={(params) => { return (params.row?.resultEditors?.includes(JSON.parse(localStorage.getItem('userDetail'))?._id) && isEditMode) ? false : true }}
                                        experimentalFeatures={{ newEditingApi: false }}
                                        onCellEditCommit={handleRowEditCommit}
                                        // onCellEditStop={(params, event) => {
                                        //     if (GridCellEditStopReasons.cellFocusOut === "cellFocusOut") {
                                        //         console.log(params)
                                        //         console.log(event)
                                        //         let updatedSubject =  { ...exam.details?.find(detail => detail.subject?._id?.toString() === params.id?.toString())};
                                        //         console.log(updatedSubject);
                                        //         console.log(new Date(params.formattedValue).toISOString())
                                        //         console.log(params)
                                        //         updatedSubject.dateTime = new Date(params.formattedValue).toISOString();
                                        //         //let updatedExam = exam.details.filter(detail => detail.subject?._id?.toString() !== params.id?.toString());
                                        //         //updatedExam.push(updatedSubject);
                                        //         console.log(updatedSubject);
                                        //     }
                                        // }}
                                    />
                                </div>
                            </Card>
                        </React.Fragment>
                    )
                })

                }
            </React.Fragment>
        )
    }
}

export default AssessmentDetails