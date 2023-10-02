import React from 'react'
import useObraSocial from '../../app-hooks/useObraSocial/useObraSocial';

const HomePage = () => {

  const {obraSociales} = useObraSocial()
  console.log(obraSociales);

  return (
    <div className='flex justify-center py-6 px-10'>
      <div className='shadow-md p-6'>
        <div className='mb-4'>
          <h1 className='text-2xl font-bold'>Solicitar turno online</h1>
        </div>

        <div>
          <div className='mb-1'>
            <p className='font-semibold'>Seleccione obra social</p>
          </div>
          <select 
            className="select select-bordered w-full"
            placeholder='Seleccione su obra social'
          >
            {obraSociales.map(obra => (
              <>
                 <option>{obra}</option>
              </>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default HomePage