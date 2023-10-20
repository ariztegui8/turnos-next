
import conectarDB from '@/utils/conectarDB'
import Task from '@/models/Task'
import Link from 'next/link'

async function loadTasks() {
    conectarDB()
    const tasks = await Task.find()
    return tasks
}

const FormTarea = async () => {
    const tasks = await loadTasks()
    return (

        <div className='grid grid-cols-3 gap-4 my-6 mx-10'>
            {tasks.map(task => (
                <Link href={`/task/${task._id}`}>
                    <div className=' shadow-md p-6 max-w-lg w-full cursor-pointer hover:bg-slate-300' key={task._id}>
                        <h1 className='mb-2'>{task.title}</h1>
                        <p>{task.description}</p>
                    </div>
                </Link>
            ))}
        </div>

    )
}

export default FormTarea