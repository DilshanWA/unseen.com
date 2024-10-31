import React from 'react'
import ImageError from '../images/errorloading.png'

function ErrorPage404 (){
   return(
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
       <h1>202</h1>
        <img src={ImageError} alt="" srcset="" />
    </div>
   )
}

export default ErrorPage404;