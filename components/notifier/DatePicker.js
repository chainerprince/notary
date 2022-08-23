import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker({value,setValue}) {
  
  
    const onchange = (dates) =>{
      setValue(dates);
           
           if(dates){      
            console.log(new Date(dates),'the dates we have')           
              //  dispatch(checkBooking(id,checkInDate.toISOString(),checkOutDate.toISOString()))
           }
       }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} fullWidth />}
        label="Choose time and date"        
        value={value}
        onChange={onchange}
        
      />
    </LocalizationProvider>
  );
}
