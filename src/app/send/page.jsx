'use client'
import React from 'react'

const Send = () => {

    const sendEmail = async ()=>{
        const res = await fetch('/api/send', {
            method: 'POST',
        })
        const data = await res.json()
        console.log(data);
    }

  return (
    <div>
        <h1>Enviar Email</h1>
        <button onClick={()=> sendEmail()} className='btn btn-primary'>Send</button>
    </div>
  )
}

export default Send