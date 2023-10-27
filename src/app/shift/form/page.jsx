
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