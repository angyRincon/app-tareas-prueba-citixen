import React from 'react';

const TaskRow = (props) => {
    return (
        <div className="container row p-3 d-flex justify-content-around">
            {   
                props.tasks.filter(t => !t.done === props.doneValue)
                .map(task => (
                        <div className="card col-md-5 p-2" key={task.id}>
                            <div className="d-flex justify-content-between align-items-center">
                                <input
                                className="ml-2"
                                    type="checkbox"
                                    style={{ height: '30px', width: '30px' }}
                                    checked={task.done}
                                    onChange={() => props.toggleTask(task)}
                                />

                                <div className="">
                                    <button className="btn">
                                        <i className="material-icons"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => props.setCurrentId(task.id)}>create</i>
                                    </button>

                                    <button className="btn">
                                        <i className="material-icons"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => props.deleteTask(task.id)}>close</i>
                                    </button>

                                </div>

                            </div>

                            <div className="card-header bg-info text-light">
                                <h4 className="text-center font-weight-bold">{task.title.toUpperCase()}</h4>
                            </div>

                            <div className="card-body bg-dark text-light">
                                <div className="d-flex justify-content-between">
                                    <h3 className="font-weight-bold">{task.subject}</h3>
                                    <h5>({task.responsable})</h5>
                                </div>
                                <p className="text-left">{task.description}</p>
                            </div>
              
                        </div>
                ))
            }

        </div>
    );
}

export default TaskRow;