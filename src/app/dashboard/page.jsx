'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {

  const {data: session, status} = useSession()
  console.log(session, status);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard