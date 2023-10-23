'use client'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {

  const [formulario, setFormulario] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')


  const router = useRouter()
  const { email, password, } = formulario

  const handleChangeForm = e => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const createUser = async () => {
    try {
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
      })
      console.log(res);

      if (res?.error) return setError(res.error)

      if (res?.ok) return router.push('/dashboard')

    } catch (error) {
      console.log(error);
    }

  }

  const handleSubmitForm = e => {
    e.preventDefault()
    console.log(formulario);
    createUser()
  }

  const signInGoogle = async ()=>{
    await signIn('google', {callbackUrl: '/dashboard'})
    // router.push('/dashboard')
  }

  return (
    <div className='flex items-center justify-center gap-5 py-6 px-10 flex-col'>
      <div className='shadow-md p-6 max-w-lg w-full'>
        <form onSubmit={handleSubmitForm}>

          <div className='mb-3 '>
            <h1 className='text-2xl font-bold '>Inicie Sesion</h1>

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

          <div className='mb-4'>
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
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          }

          <div className='flex '>
            <button type='submit' className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600 ">Login</button>
          </div>

          <div className="divider text-xs my-6">OR</div>

          <div className={` mb-3`}>
            <button onClick={()=> signInGoogle()} type='button' className="btn w-full text-[#000] bg-white hover:bg-white "><FcGoogle size={24} /> Ingresar con Google</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login