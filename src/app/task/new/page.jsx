'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FormTask = () => {

    const router = useRouter();
    const params = useParams()
    console.log('params', params.id);

    const [formulario, setFormulario] = useState({
        title: '',
        description: '',
    })

    const { title, description } = formulario

    const handleChangeForm = e => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`)
        const data = await res.json()
        setFormulario({
            title: data.taskFound.title,
            description: data.taskFound.description
        })
    }

    const createTask = async () => {
        try {
            const res = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify(formulario),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (res.status === 200) {
                router.push('/task/form')
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async () => {
        try {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(formulario),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()
            router.push('/task/form')
            router.refresh()
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitForm = async e => {
        e.preventDefault()
        if (!params.id) {
            await createTask()
        } else {
            updateTask()
        }

        setFormulario({
            title: '',
            description: ''
        })
    }

    const handleDelete = async () => {
        if (window.confirm('¿Estas seguro que deseas eliminar la tarea?')) {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: 'DELETE',
            })
            router.push('/task/form')
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
            getTask()
        }
    }, [])


    return (
        <div className='flex items-center justify-center gap-5 py-6 px-10 flex-col'>
            <div className='shadow-md p-6 max-w-lg w-full'>
                <form onSubmit={handleSubmitForm}>

                    <div className='mb-3 flex items-center justify-between gap-2'>
                        <h1 className='text-2xl font-bold '>{!params.id ? 'Crear Tarea' : 'Editar Tarea'}</h1>
                        <div className='flex items-center gap-2'>
                            {/* <button type='button' onClick={handleEdit} className="btn btn-outline btn-warning btn-sm">Editar</button> */}
                            <button type='button' onClick={handleDelete} className="btn btn-outline btn-error btn-sm">Eliminar</button>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <div className='mb-1'>
                            <p>Title</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Ingrese su Title"
                            className="input input-bordered w-full"
                            onChange={handleChangeForm}
                            name='title'
                            value={title}
                        />
                    </div>

                    <div className='mb-2'>
                        <div className='mb-1'>
                            <p>Description</p>
                        </div>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Ingrese su Description"
                            onChange={handleChangeForm}
                            name='description'
                            value={description}
                        >
                        </textarea>

                    </div>


                    <div className='flex '>
                        <button type='submit' className="btn w-full text-[#fff] bg-sky-600 hover:bg-sky-600 ">{!params.id ? 'Crear' : 'Editar'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormTask