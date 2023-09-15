
import './index.css'

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

import { useEffect } from 'react'

const SuccessfullyBookedFashion = (props) =>{

useEffect(()=>{
    const {history} = props
    setTimeout (()=>{
       history.replace("/fashionzone")
    },3500)
},[props])

   return(
       <div className='successfull-booked'>
           <img className='booked-successfully' src='./successfullyBooked.gif' alt="Successfully Booked"/>
           <p className='booked-successfully-head'>Successfully Booked</p>
       </div>
   )
}
export default withRouter(SuccessfullyBookedFashion)