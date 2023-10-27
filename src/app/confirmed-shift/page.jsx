'use client'
import React, { useEffect, useState } from 'react'
import useTurnos from '../../../app-hooks/useTurnos'
import { ClipLoader } from 'react-spinners'
import { formatearFecha } from '@/helpers'


const confirmedShift = () => {

  const [formStorage, setFormStorage] = useState(null)

  useEffect(() => {
    const storedForm = localStorage.getItem('form');
    if (storedForm) {
      setFormStorage(JSON.parse(storedForm))
      console.log('Datos del localStorage:', formStorage);
    } else {
      console.log('No se encontraron datos en el localStorage');
    }
  }, []);


  return (
    <div className='flex justify-center py-6 px-10 '>
      <div className='shadow-md p-6 w-[500px]'>
        {formStorage === null ?
          <div className='m-auto text-center'>
            <ClipLoader
              color="#404EED"
              size={35}
            />
          </div>
          :
          <>
            <div className='mb-6'>
              <h1 className='text-2xl font-bold mb-6'>Tu turno fue confirmado exitosamente!</h1>
              <div className='flex flex-col items-center'>
                <p className='text-lg mb-2'>Fecha: {formatearFecha(formStorage.fecha)}</p>
                <p className='text-lg mb-2'>Hora: {formStorage.hora}</p>
                <p className='text-lg mb-2'>Profesional: {formStorage.medico}</p>
              </div>
            </div>
          </>

        }

        {/* <pre className="overflow-x-auto">{JSON.stringify({ formStorage }, null, 2)}</pre> */}

      </div>
    </div>
  )
}

export default confirmedShift