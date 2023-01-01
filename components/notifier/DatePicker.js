import * as React from 'react';
import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch } from 'react-redux';
import { checkBooking } from '../../state/actions/appointmentAction';
import moment from 'moment';
import dayjs from 'dayjs';

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} fullWidth />}
        label="Choose time and date"        
        value={value}
        minDate={today}
        minTime={dayjs('2022-02-14T08:00')}
        maxTime={dayjs('2022-02-14T19:00')}
        onChange={onchange}
        
      />
    </LocalizationProvider>
  );
}
