import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch } from 'react-redux';
import { checkBooking } from '../../state/actions/appointmentAction';
import moment from 'moment';

export default function BasicDateTimePicker({value,setValue,id}) {
    const today = new Date();
    const dispatch = useDispatch();
    const onchange = (dates) =>{
      setValue(dates);           
           if(dates){      
            console.log(moment(new Date(dates)).format("YYYY-MM-DD HH:mm:ss"),'the dates we have') 
            setTimeout(()=>{dispatch(checkBooking(id, moment(new Date(dates)).format("YYYY-MM-DD HH:mm:ss")))},1000)                         
           }
       }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} fullWidth />}
        label="Choose time and date"        
        value={value}
        minDate={today}
        onChange={onchange}
        
      />
    </LocalizationProvider>
  );
}
