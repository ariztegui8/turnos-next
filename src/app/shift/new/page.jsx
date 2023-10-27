'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FormShiftNew = () => {

    const router = useRouter();
    const params = useParams()

    const [formulario, setFormulario] = useState({
        fecha: '',
        hora: '',
        profesional: ''
    })

    const { fecha, hora, profesional } = formulario

    const handleChangeForm = e => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const getShift = async () => {
        const res = await fetch(`/api/shifts/${params.id}`)
        const data = await res.json()
        setFormulario({
            fecha: data.shiftFound.fecha,
            hora: data.shiftFound.hora,
            profesional: data.shiftFound.profesional
        })
    }

    const createShift = async () => {
        try {
            const res = await fetch('/api/shifts', {
                method: "POST",
                body: JSON.stringify(formulario),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (res.status === 200) {
                router.push('/shift/form')
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateShift = async () => {
        try {
            const res = await fetch(`/api/shifts/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(formulario),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()
            router.push('/shift/form')
            router.refresh()
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitForm = async e => {
        e.preventDefault()
        if (!params.id) {
            await createShift()
        } else {
            updateShift()
        }

        setFormulario({
            fecha: '',
            hora: '',
            profesional: ''
        })
    }

    const handleDelete = async () => {
        if (window.confirm('¿Estas seguro que deseas eliminar la tarea?')) {
            const res = await fetch(`/api/shifts/${params.id}`, {
                method: 'DELETE',
            })
            router.push('/shift/form')
            router.refresh()
        }
        console.log('delete');
    }

    const handleEdit = () => {
        // e.preventDefault()
        console.log('edit');
    }

    useEffect(() => {
        if (params.id) {
            getShift()
        }
    }, [])


    return (
        <div className='flex items-center justify-center gap-5 py-6 px-10 flex-col'>
            <div className='shadow-md p-6 max-w-lg w-full'>
                <form onSubmit={handleSubmitForm}>

                    <div className='mb-3 flex items-center justify-between gap-2'>
                        <h1 className='text-2xl font-bold '>{!params.id ? 'Crear turno' : 'Editar turno'}</h1>
                        {!params.id ?
                            ''
                            :
                            <div className='flex items-center gap-2'>
                                {/* <button type='button' onClick={handleEdit} className="btn btn-outline btn-warning btn-sm">Editar</button> */}
                                <button type='button' onClick={handleDelete} className="btn btn-outline btn-error btn-sm">Eliminar</button>
                            </div>
                        }
                    </div>
                    <div className='mb-2'>
                        <div className='mb-1'>
                            <p>Fecha</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingrese su Title"
                            className="input input-bordered w-full"
                            onChange={handleChangeForm}
                            name='fecha'
                            value={fecha}
                        />
                    </div>

                    <div className='mb-2'>
                        <div className='mb-1'>
                            <p>Hora</p>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Ingrese su Description"
                            onChange={handleChangeForm}
                            name='hora'
                            value={hora}
                        />
                    </div>

                    <div className='mb-2'>
                        <div className='mb-1'>
                            <p>Profesional</p>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Ingrese su Description"
                            onChange={handleChangeForm}
                            name='profesional'
                            value={profesional}
                        />
                    </div>


                    <div className='flex '>
                        <button type='submit' className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600 ">{!params.id ? 'Crear' : 'Editar'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormShiftNew