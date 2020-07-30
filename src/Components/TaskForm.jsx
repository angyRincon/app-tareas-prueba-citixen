import React, { useState, useEffect } from 'react';
import { db } from '../database';

const TaskForm = (props) => {

    const dataInicial = {
        title: '',
        subject: '',
        responsable: '',
        description: '',
        done: false
    }

    const [values, setValues] = useState(dataInicial);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setValues({
            ...values, [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.addOrEdit(values);

        setValues({ ...dataInicial });
    }

    //Editing

    const getTaskById = async (id) => {
        const doc = await db.collection('tasks').doc(id).get();
        setValues({
            ...doc.data()
        })
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...dataInicial })
        } else {
            getTaskById(props.currentId)
        }
    }, [props.currentId]);

    return (
        <form className="row bg-dark p-4 text-light" onSubmit={handleSubmit}>

            <div className="col-md-12 col-sm-12 mb-2">

                <h1 className="mb-3 text-center">
                    {props.currentId === '' ? "AGREGAR TAREA" : "EDITAR TAREA"}
                </h1>

                <input
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Título"
                    onChange={handleChange}
                    value={values.title} 
                    autoFocus required/>
            </div>

            <div className="col-md-12 col-sm-12 mb-2">
                <input
                    name="subject"
                    type="text"
                    className="form-control"
                    placeholder="Materia"
                    onChange={handleChange} 
                    value={values.subject}
                    required/>
            </div>

            <div className="col-md-12 col-sm-12 mb-2">
                <input
                    name="responsable"
                    type="text"
                    className="form-control"
                    placeholder="Reponsable"
                    onChange={handleChange} 
                    value={values.responsable}
                    required/>
            </div>

            <div className="col-md-12 col-sm-12 mb-2">
                <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    placeholder="Descripción"
                    onChange={handleChange}
                    value={values.description}
                    required>
                </textarea>
            </div>

            <div className="col-md-12">
                <button className="btn btn-info btn-block">
                    {props.currentId === '' ? "AGREGAR TAREA" : "EDITAR TAREA"}
                </button>
            </div>

        </form>
    );
};


export default TaskForm;