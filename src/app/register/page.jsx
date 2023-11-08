'use client'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';

const Register = () => {

  const [formulario, setFormulario] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter()
  const { name, email, password, } = formulario

  const handleChangeForm = e => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const createUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/auth/signup', formulario, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('register', res);

      if (res?.status == 200) {
        setIsLoading(false);
        registerSuccess()
        router.push('/login')
        router.refresh()
      }

      // const resAuth = await signIn('credentials', {
      //   email: res.data.email,
      //   password: password,
      //   redirect: false
      // })
      // console.log('resAuth',resAuth);

      // if (resAuth?.ok) {
      //   registerSuccess()
      //   router.push('/dashboard')
      //   router.refresh()
      // }

    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }

  }

  const handleSubmitForm = e => {
    e.preventDefault()
    console.log(formulario);
    createUser()
  }

  const registerSuccess = () => {
    toast.success('Te registraste correctamente')
  }


  return (
    <>
      <div className='flex items-center justify-center gap-4 py-6 px-10 flex-col'>
        <div className='shadow-md p-6 max-w-lg w-full'>
          <form onSubmit={handleSubmitForm}>

            <div className='mb-3 '>
              <h1 className='text-2xl font-bold '>Registrate</h1>

            </div>

            <div className='mb-2'>
              <div className='mb-1'>
                <p>name</p>
              </div>
              <input
                type="text"
                placeholder="Ingrese su name"
                className="input input-bordered w-full"
                onChange={handleChangeForm}
                name='name'
                value={name}
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
              <div className="alert alert-error mb-6 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            }

            {isLoading ?
              <div className='flex '>
                <button className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600">
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              </div>
              :
              <div className='flex '>
                <button type='submit' className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600 ">Registrar</button>
              </div>

            }

          </form>
        </div>

        <div className='shadow-md p-6 max-w-lg w-full text-center'>
          <p>¿Ya tienes cuenta? <Link className="text-green-600" href={'/login'}>Inicia sesion</Link></p>
        </div>

        <Toaster
          position="top-center"
        />
        {/* <button onClick={() => toast.success('My success toast')}>Give me a toast</button> */}
      </div>
    </>
  )
}

export default Register