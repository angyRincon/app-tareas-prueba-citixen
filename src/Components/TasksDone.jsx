import React, { useState } from 'react';

const TasksDone = (props) => {

    return (
            <div className="form-check text-center">

                <input type="checkbox"
                    name="check"
                    className="form-check-input"
                    checked={props.isChecked}
                    onChange={e => props.callback(e.target.checked)}
                    style={{ height: '30px', width: '30px' }} />

            <label className="ml-3" htmlFor=""><h4>Mostrar Tareas Completadas</h4></label>

            </div >
    );
}

export default TasksDone;