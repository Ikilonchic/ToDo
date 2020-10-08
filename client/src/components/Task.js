import React from 'react';
import { deleteTaskRequest } from '../hooks/Request.hook';

export default class Task extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      p_id: props.p_id,
      t_id: props.task.id,
      text: props.task.text,
      status: props.task.status,
      deadline: new Date(props.task.deadline ? props.task.deadline : null),
      priority: props.task.priority,

      deleteFromProject: props.deleteTask
    };

    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  render(){
    return this.displayTask();
  }

  displayTask() {
    return (
      <div id={this.state.id} className="task">
        <div className="task__body">
          <div className="task__title" title={this.state.deadline}>
            {this.state.text}
          </div>
          <div className="task__button-group">
            <button type="button" className="task__button" onClick={this.setStatus}>
              +
            </button>
            <button type="button" className="task__button" onClick={this.editTask}>
              Edit
            </button>
            <button type="button" className="task__button" onClick={this.deleteTask}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  setStatus() {
    
  }

  editTask() {

  }

  deleteTask() {
    deleteTaskRequest(this.state.p_id, this.state.t_id).then(() => {
      this.state.deleteFromProject(this.state.t_id);
      this.forceUpdate();
    });
  }
};
