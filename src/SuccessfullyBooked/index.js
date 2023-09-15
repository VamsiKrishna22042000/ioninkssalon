
import './index.css'

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

import { useEffect } from 'react'

const SuccessfullyBooked = (props) =>{

useEffect(()=>{
    const {history} = props
    setTimeout (()=>{
       history.replace("/beautyzone")
    },3500)
},[props])

   return(
       <div className='successfull-booked'>
           <img className='booked-successfully' src='./successfullyBooked.gif' alt="Successfully Booked"/>
           <p className='booked-successfully-head'>Successfully Booked</p>
       </div>
   )
}
export default withRouter(SuccessfullyBooked)