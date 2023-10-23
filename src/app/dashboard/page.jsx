'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {

  const { data: session, status } = useSession()
  console.log(session, status);
  // console.log(session?.user?.credentials?.method);

  return (
    <div className='flex items-center justify-center gap-5 py-6 px-10 flex-col'>
      <div className='shadow-md p-6 max-w-lg w-full'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold '>Hola {session?.user?.name}!</h1>
        </div>

        <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
      </div>
    </div>



  )
}

export default Dashboard