/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Button } from "@material-ui/core";
import { formateTime } from "../../../components/commonController/commonController";

export const dateParser = (value) => {
    console.log(value)
    return new Date(value)?.toDateString()+', '+ formateTime(new Date(value))?.strTime
  }

export const resultsButton = (params) => {
    return <Button size="small" disabled = {!params.row?.resultEditors?.includes(JSON.parse(localStorage.getItem('userDetail'))?._id)} 
    onClick={() => {
        console.log(JSON.parse(localStorage.getItem('userDetail')))
        console.log(params.row)
    }} variant="outlined">Add Results</Button>
}


export const discardPastDateTime = (params) => {
  const hasError = params.props.value < new Date();
  return { ...params.props, error: hasError };
} 

