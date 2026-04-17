import React from 'react'
import Button from '@mui/material/Button';

export default function Header() {
  
  return (
    <div className='flex items-center justify-between  '>
        <p className='text-[25px] font-medium'>User List</p>
        <div className=' flex items-center gap-5'>
             <Button variant="contained">+ ADD</Button>
             <Button  sx={{
    backgroundColor: 'gray',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00000099',
    },
  }} variant="outlined">Light</Button>
             <Button variant="outlined">Dark</Button>
        </div>
    </div>
  )
}
