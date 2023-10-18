'use client'
import React, { useEffect, useState } from 'react'
import useObraSocial from '../../app-hooks/useObraSocial';
import useProfesionales from '../../app-hooks/useProfesionales';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatearFecha } from '@/helpers';
import useHora from '../../app-hooks/useHora';
import { useRouter } from 'next/navigation';
import useTurnos from '../../app-hooks/useTurnos';
import SignIn from '@/components/SignIn';
import { useSession } from 'next-auth/react';

const HomePage = () => {

  const { obraSociales } = useObraSocial()
  const { medicos } = useProfesionales()
  const { horario } = useHora()
  const { dateTurnos, setDateTurnos } = useTurnos()
  const { data: session } = useSession()

  const [btnRadio, setBtnRadio] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [changeDate, setChangeDate] = useState(false);
  const [horarios, setHorarios] = useState('')

  const [form, setForm] = useState({
    obra: 'Seleccionar',
    medico: 'Seleccionar',
  })

  console.log(horario);
  console.log(horarios);


  const { obra, radio, medico } = form

  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setForm({
      ...form,
      radio: btnRadio,
      fecha: startDate,
      hora: horarios
    });
  }, [btnRadio, horarios, startDate]);

  const funRadio = (ra) => {
    setBtnRadio(ra)
  }

  const handleHora = hour => {
    setHorarios(hour)
  }

  const handleDatePicker = date => {
    setStartDate(date);
    setChangeDate(true);
  };

  const router = useRouter()

  const submitDataForm = e => {
    setDateTurnos(form)
    router.push('/turno')
  }



  return (
    <div className='flex items-center justify-center gap-5 py-6 px-10 flex-col'>

      {session &&
        <div className='shadow-md p-6 max-w-lg w-full'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold'>Solicitar turno online</h1>
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <p className='font-semibold'>Seleccione obra social</p>
            </div>
            <select
              className="select select-bordered w-full"
              placeholder='Seleccione su obra social'
              onChange={handleForm}
              name='obra'
              value={obra}
            >
              {obraSociales.map(obra => (
                <>
                  <option>{obra}</option>
                </>
              ))}
            </select>
          </div>

          {obra !== 'Seleccionar' &&
            <div className='mb-4'>
              <div className='mb-2'>
                <p className='font-semibold'>Solicitar turno por</p>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2'>
                  <input
                    type="radio"
                    className="radio radio-sm"
                    onChange={handleForm}
                    name="radio"
                    value={radio}
                    checked={btnRadio == 'Especialidad'}
                    onClick={() => funRadio('Especialidad')}
                  />
                  <p>Especialidad</p>
                </div>

                <div className='flex items-center gap-2'>
                  <input
                    type="radio"
                    className="radio radio-sm"
                    onChange={handleForm}
                    name="radio"
                    value={radio}
                    checked={btnRadio == 'Profesional'}
                    onClick={() => funRadio('Profesional')}
                  />
                  <p>Profesional</p>
                </div>
              </div>
            </div>
          }

          {btnRadio == 'Profesional' &&
            <div className='mb-6'>
              <select
                className="select select-bordered w-full"
                placeholder='Seleccione su obra social'
                onChange={handleForm}
                name='medico'
                value={medico}
              >
                {medicos.map(med => (
                  <>
                    <option>{med}</option>
                  </>
                ))}
              </select>
            </div>
          }

          {btnRadio == 'Especialidad' &&
            <div className='mb-6'>
              <p>No hay ninguna especialidad</p>
            </div>
          }

          {medico !== 'Seleccionar' &&
            <div className='mb-6'>
              <div className='mb-2'>
                <p className='font-semibold'>Fecha y horario</p>
              </div>

              <div className='border border-gray-400 rounded-lg  p-3'>
                <DatePicker
                  className='react-datepicker'
                  selected={startDate}
                  onChange={handleDatePicker}
                />
              </div>
            </div>
          }

          {changeDate &&
            <>
              <div className='flex items-center gap-2 flex-wrap mb-6'>
                {horario.map(hr => (
                  <>
                    <span
                      onClick={() => handleHora(hr)}
                      className={`badge badge-lg p-4  text-[#fff] cursor-pointer ${horarios == hr ? 'bg-sky-600' : 'bg-slate-600'}`}
                    >
                      {hr}
                    </span>
                  </>
                ))}
              </div>

              <div className='flex justify-end'>
                <button onClick={() => submitDataForm()} className="btn text-[#fff] bg-sky-600 hover:bg-sky-600 ">Continuar</button>
              </div>
            </>
          }

        </div>

      }

      {session ?
        ''
        :
        <div className='shadow-md p-6 max-w-lg w-full'>
          <SignIn />
        </div>
      }
    </div>
  )
}

export default HomePage