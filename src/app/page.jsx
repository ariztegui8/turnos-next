import React from 'react'
import gohan from '../assets/gohanGif.gif'


const Home = () => {
  return (
    <div className=' gap-5 py-6 px-10 w-full'>
      <div className='w-full m-auto'>
        <div className='mb-3 w-full text-center'>
          <h1 className='text-2xl font-bold mb-6'>Bienvenidos al Team Ariztegui</h1>
          <img  className='m-auto rounded-lg' src={gohan.src} alt="gohan" />
        </div>
      </div>
    </div>
  )
}

export default Home