import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {

    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        fecha: '',
        telefono: ''
    })
    const [newAccount, setNewAccount] = useState(false)

    const handleClick = () => {
        if (drawerOpen) {
          setDrawerOpen(false);
        }
      };
    
      const { data: session } = useSession()
    

    const { nombre, apellido, dni, fecha, telefono } = formulario

    const handleChangeForm = e => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        setNewAccount(true)
        console.log(formulario);
    }

    const handleNewAccount = e =>{
        e.preventDefault()
        setNewAccount(true)
    }

    const handleNewAccountBack = e =>{
        e.preventDefault()
        setNewAccount(false)
    }


    return (

        <div className='mb-6'>
            <div className='mb-6'>
                <div className={` mb-3 ${newAccount ? 'hidden' : 'flex'}`}>
                    <button onClick={ handleNewAccount} className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600 ">Crear Cuenta</button>
                </div>

                <div className={` mb-2 ${newAccount ? 'hidden' : 'flex'}`}>
                    <button onClick={() => { signIn() }} className="btn w-full text-[#000] bg-white hover:bg-white "><FcGoogle size={24} /> Ingresa con Google</button>
                </div>
            </div>
            {newAccount &&
                <>
                    <form onSubmit={handleSubmitForm}>
                        <div className='mb-3'>
                            <button onClick={handleNewAccountBack} className="btn btn-outline btn-info btn-sm">Volver</button>
                        </div>
                        <div className='mb-2'>
                            <div className='mb-1'>
                                <p>Nombre</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Ingrese su Nombre"
                                className="input input-bordered w-full"
                                onChange={handleChangeForm}
                                name='nombre'
                                value={nombre}
                            />
                        </div>

                        <div className='mb-2'>
                            <div className='mb-1'>
                                <p>Apellido</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Ingrese su Apellido"
                                className="input input-bordered w-full"
                                onChange={handleChangeForm}
                                name='apellido'
                                value={apellido}
                            />
                        </div>

                        <div className='mb-2'>
                            <div className='mb-1'>
                                <p>DNI</p>
                            </div>
                            <input
                                type="number"
                                placeholder="Ingrese su DNI"
                                className="input input-bordered w-full"
                                onChange={handleChangeForm}
                                name='dni'
                                value={dni}

                            />
                        </div>

                        <div className='mb-2'>
                            <div className='mb-1'>
                                <p>Fecha de nacimiento</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Ingrese fecha de nacimiento"
                                className="input input-bordered w-full"
                                onChange={handleChangeForm}
                                name='fecha'
                                value={fecha}
                            />
                        </div>

                        <div className='mb-4'>
                            <div className='mb-1'>
                                <p>Telefono</p>
                            </div>
                            <input
                                type="number"
                                placeholder="Ingrese su telefono"
                                className="input input-bordered w-full"
                                onChange={handleChangeForm}
                                name='telefono'
                                value={telefono}
                            />
                        </div>

                        <div className='flex '>
                            <button type='submit' className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600 ">Crear</button>
                        </div>
                    </form>
                </>
            }

        </div>

    )
}

export default SignIn