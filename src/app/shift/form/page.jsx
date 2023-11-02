
import conectarDB from '@/utils/conectarDB'
import Link from 'next/link'
import Shift from '@/models/Shift'

async function loadShift() {
    conectarDB()
    const shift = await Shift.find()
    return shift
}

const FormShift = async () => {

    const shift = await loadShift()
'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const FormShiftNew = () => {

    const router = useRouter();
    const params = useParams()
    const { data: session, status } = useSession()

    const [formulario, setFormulario] = useState({
        fecha: '',
        hora: '',
        profesional: '',
        usuarioId: ''
    })

    const { fecha, hora, profesional, usuarioId } = formulario

    const handleChangeForm = e => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
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
                router.push('/shift/items')
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
            router.push('/shift/items')
            router.refresh()
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        if (window.confirm('¿Estas seguro que deseas eliminar la tarea?')) {
            const res = await fetch(`/api/shifts/${params.id}`, {
                method: 'DELETE',
            })
            router.push('/shift/items')
            router.refresh()
        }
        console.log('delete');
    }

    const getShift = async () => {
        const res = await fetch(`/api/shifts/${params.id}`)
        const data = await res.json()
        let usuarioId;

        if (status === 'authenticated') {
            if (session.user.id) {
                usuarioId = session.user.id;
            } else if (session.user._id) {
                usuarioId = session.user._id;
            }
        }

        setFormulario({
            fecha: data.shiftFound.fecha,
            hora: data.shiftFound.hora,
            profesional: data.shiftFound.profesional,
            usuarioId: usuarioId || '' 
        })
    }

    useEffect(() => {
        if (params.id) {
            getShift()
        }
    }, [])

    useEffect(() => {
        if (status === 'authenticated') {
            if (session.user.id) {
                setFormulario({
                    ...formulario,
                    usuarioId: session.user.id
                });
            } else if (session.user._id) {
                setFormulario({
                    ...formulario,
                    usuarioId: session.user._id
                });
            }
        }
    }, [status, session]);


    return (
        <div className='grid grid-cols-3 gap-4 my-6 mx-10'>
            {shift.map(turno => (
                <Link href={`/shift/${turno._id}`}>
                    <div className=' shadow-md p-6 max-w-lg w-full cursor-pointer hover:bg-slate-300' key={turno._id}>
                        <p className='mb-2 text-lg font-medium'>Fecha: {turno.fecha}</p>
                        <p className='mb-2 text-lg font-medium'>Hora: {turno.hora}</p>
                        <p className='mb-2 text-lg font-medium'>Profesional: {turno.profesional}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default FormShift