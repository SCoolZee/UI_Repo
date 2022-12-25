/* eslint-disable react/jsx-pascal-case */
import { Button } from "@material-ui/core";
import { formateTime } from "../../../components/commonController/commonController";

const dateParser = (value) => {
    console.log(value)
    return new Date(value)?.toDateString()+', '+ formateTime(new Date(value))?.strTime
  }

const resultsButton = (params) => {
    return <Button size="small" disabled = {params.row?.resultEditors?.includes(JSON.parse(localStorage.getItem('userDetail'))?._id)} 
    onClick={() => {
        console.log(JSON.parse(localStorage.getItem('userDetail')))
        console.log(params)
    }} variant="outlined">Add Results</Button>
}

export const assessmentColumns = [
    { field: 'subject', headerName: 'Subject', width: 370, editable: false },
    { field: 'dateTime', type: 'dateTime',width: 370, headerName: 'Date/Time', editable: true, valueParser: dateParser },
    { field: 'actions', type: 'button', headerName: 'Acrions', width: 400, editable: false, renderCell: resultsButton },
  ];
