import React from 'react';
import {TextField,Button} from '@mui/material';
import './forgotpassword.css';

const Forgotpassword = () => {
  return (
    <div className='fpass main mt-5 pt-5 pb-5'>
    <div  className='fpass card text-center w-50'>
        <form>
        <div className='fpass card-body'>   
        <h3 className='fpass text-center' style={{color:'black'}}>Change Your Password</h3>
        <TextField sx={{mt:3}} fullWidth label="Email" />
        <TextField  sx={{mt:3}} fullWidth label="Mobile number"  />
        <TextField  sx={{mt:3}} fullWidth label=" New Password" type="password" />
        <Button  variant="contained" type="submit" color='secondary' sx={{mt:5}}>Change Password</Button>
        </div>
        
        </form>
    </div>
    </div>
  )
}

export default Forgotpassword