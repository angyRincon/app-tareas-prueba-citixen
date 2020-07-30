import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import { db } from '../database';
import { toast } from 'react-toastify';
import TasksDone from './TasksDone';
import TaskRow from '../TaskRow';

const Tasks = () => {

    const [tasks, setTasks] = useState([]);

    const [currentId, setCurrentId] = useState('');

    const [taskDone, setTaskDone] = useState(true);

    //Add or Edit Task
    const addOrEdit = async (taskObject) => {

        try {

            if (currentId === '') {
                await db.collection('tasks').doc().set(taskObject);
                toast('Tarea Agregada', {
                    type: 'success',
                    autoClose: 1500
                });
            } else {
                await db.collection('tasks').doc(currentId).update(taskObject);
                toast('Tarea Actualizada', {
                    type: 'info',
                    autoClose: 1500
                });
            }

            setCurrentId('');
        } catch (error) {
            console.log(error)
        }
    }

    //DELETE TASK
    const deleteTask = async (id) => {

        try {
            if (window.confirm("¿Seguro desea eliminar esta tarea?")) {
                await db.collection('tasks').doc(id).delete();
                toast('Tarea Eliminada', {
                    type: 'error',
                    autoClose: 1500
                });
            }
        } catch (error) {
            console.error(error)
        }
    }

    //Get Data
    const getData = () => {
        db.collection('tasks').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });

            setTasks(docs);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const toggleTask = (task) => {
        setTasks(
            tasks.map(item => (item.id === task.id ? { ...item, done: !item.done } : item))
        )
    }


    const taskTableRows = (doneValue) => {
        return <TaskRow
            doneValue={doneValue}
            tasks={tasks}
            currentId={currentId}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            setCurrentId={setCurrentId}/>

    }
    return (
        <div className="mt-5">

            <div className="text-center col-md-12">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item  col-md-4 col-sm-12  ml-2" role="presentation">
                        <a className="nav-link bg-info text-light" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                            <h5>Agregar Tareas</h5>
                        </a>
                    </li>
                    <li className="nav-item col-md-4 col-sm-12 ml-2" role="presentation">
                        <a className="nav-link bg-info text-light" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                            <h5>Tareas Pendientes</h5>
                        </a>
                    </li>
                    <li className="nav-item col-md-3 col-sm-12 ml-2" role="presentation">
                        <a className="nav-link bg-info text-light" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                            <h5>Tareas Completadas</h5>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"><TaskForm {...{ addOrEdit, currentId, tasks }} /></div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">


                    <p className="bg-info p-2 text-light font-weight-bold">Agrega una Nueva Tarea</p>

                    {taskTableRows(true)}


                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                    {
                        taskDone && (
                            <div className="col-md-12">
                                {taskTableRows(false)}

                                <p className="bg-info col-md-12 p-2 text-light font-weight-bold">
                                    Agrega una Nueva Tarea
                                </p>
                            </div>
                        ) || (
                            <div>
                                {taskTableRows(true)}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};


export default Tasks;               