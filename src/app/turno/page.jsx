'use client'
import React, { useEffect, useState } from 'react'
import useTurnos from '../../../app-hooks/useTurnos'


const Turno = () => {

   const { dateTurnos } = useTurnos()

   console.log(dateTurnos);

  return (
    <div className='flex justify-center py-6 px-10 '>
      <div className='shadow-md p-6 w-[500px]'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Tu turno online</h1>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Turno