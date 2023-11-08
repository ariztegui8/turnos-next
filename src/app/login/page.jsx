'use client'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

const Login = () => {

  const [formulario, setFormulario] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);


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
      setIsLoading(true);
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
      })
      console.log(res);

      if (res?.error) return setError(res.error)

      if (res?.ok) {
        setIsLoading(false);
        return router.push('/dashboard');
      }

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }

  }

  const handleSubmitForm = e => {
    e.preventDefault()
    console.log(formulario);
    createUser()
  }

  const signInGoogle = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
    // router.push('/dashboard')
  }

  return (
    <>
      <div className='flex items-center justify-center gap-4 py-6 px-10 flex-col'>
        <div className='shadow-md p-6 max-w-lg w-full'>
          <form onSubmit={handleSubmitForm}>

            <div className='mb-3 '>
              <h1 className='text-2xl font-bold '>Inicie Sesion</h1>

            </div>

            <div className='mb-4'>
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
                <div className='flex items-center gap-3 justify-between'>
                  <p>Password</p>
                  <Link className="text-sky-600 text-sm" href='#'>¿Has olvidado tu contraseña?</Link>
                </div>

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

            {isLoading ?
             <div className='flex '>
              <button className="btn w-full text-[#fff] bg-green-600 hover:bg-green-600">
                <span className="loading loading-spinner"></span>
                loading
              </button>
              </div>
              :
              <div className='flex '>
                <button type='submit' className="btn w-full text-[#fff] bg-green-600 hover:bg-green-600 ">Login</button>
              </div>

            }



            <div className="divider text-xs my-4">OR</div>

            <div className={` mb-3`}>
              <button onClick={() => signInGoogle()} type='button' className="btn w-full text-[#000] bg-white hover:bg-white "><FcGoogle size={24} /> Ingresar con Google</button>
            </div>
          </form>
        </div>

        <div className='shadow-md p-6 max-w-lg w-full text-center'>
          <p>¿Nuevo en Team Ariztegui? <Link className="text-sky-600" href={'/register'}>Crea una cuenta</Link></p>
        </div>

      </div>


    </>
  )
}

export default Login