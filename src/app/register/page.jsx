'use client'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from 'axios';

const Register = () => {

  const [formulario, setFormulario] = useState({
    fullname: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState()


  const { fullname, email, password, } = formulario

  const handleChangeForm = e => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const createUser = async () => {
    try {
      const res = await axios.post('/api/auth/signup', formulario, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res);
      // if (res.status === 200) {
      //   router.push('/task/form')
      //   router.refresh()
      // }

    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }

  }

  const handleSubmitForm = e => {
    e.preventDefault()
    console.log(formulario);
    createUser()
  }


  return (
    <div className='flex items-center justify-center gap-5 py-6 px-10 flex-col'>
      <div className='shadow-md p-6 max-w-lg w-full'>
        <form onSubmit={handleSubmitForm}>

          <div className='mb-3 '>
            <h1 className='text-2xl font-bold '>Register</h1>

          </div>

          <div className='mb-2'>
            <div className='mb-1'>
              <p>Fullname</p>
            </div>
            <input
              type="text"
              placeholder="Ingrese su fullname"
              className="input input-bordered w-full"
              onChange={handleChangeForm}
              name='fullname'
              value={fullname}
            />
          </div>

          <div className='mb-2'>
            <div className='mb-1'>
              <p>Email</p>
            </div>
            <input
              type="email"
              placeholder="Ingrese su email"
              className="input input-bordered w-full"
              onChange={handleChangeForm}
              name='email'
              value={email}
            />
          </div>

          <div className='mb-6'>
            <div className='mb-1'>
              <p>Password</p>
            </div>
            <input
              type="password"
              placeholder="Ingrese su password"
              className="input input-bordered w-full"
              onChange={handleChangeForm}
              name='password'
              value={password}

            />
          </div>

          {error &&
            <div className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          }

          <div className='flex '>
            <button type='submit' className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600 ">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register