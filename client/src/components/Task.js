import React from 'react';
import swal from 'sweetalert';

import { MdHighlightOff, MdDone, MdDoneAll } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { BsDot } from 'react-icons/bs';

import { deleteTaskRequest, updateTaskRequest } from '../hooks/Request.hook';

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

    this.changeStatus = this.changeStatus.bind(this);
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
            {(this.state.status) ? <MdDoneAll /> : <BsDot />} {this.state.text}
          </div>
          <div className="task__button-group">
            <button type="button" className="task__button" onClick={this.changeStatus}>
              <MdDone />
            </button>
            <button type="button" className="task__button" onClick={this.editTask}>
              <HiPencil />
            </button>
            <button type="button" className="task__button" onClick={this.deleteTask}>
              <MdHighlightOff /> 
            </button>
          </div>
        </div>
      </div>
    );
  }

  changeStatus() {
    const task = {
      status: !this.state.status,
    };

    updateTaskRequest(this.state.p_id, this.state.t_id, task).then(() => {
      this.setState({
        status: task.status
      });
    }).catch(error => {
      swal({
        title: 'Error!',
        text: 'Connection error. Please, try again.',
        button: {
          text: 'Ok!',
          closeModal: true,
          className: 'container-form-btn p-t-20 form-btn'
        }
      });
    });
  }

  editTask() {
    swal({
      text: "Task name",
      content: "input",
      button: {
      text: "Edit Task",
      value: 'edit_task',
      closeModal: true,
      className: 'container-form-btn p-t-20 form-btn'
    }}).then(task_name =>{
      if(!task_name){
        return
      }

      const task = {
        text: task_name,
        status: this.state.status,
        deadline: this.state.deadline
      };

      updateTaskRequest(this.state.p_id, this.state.t_id, task).then(() => {
        this.setState({
          text: task.text
        });
      }).catch(error => {
        swal({
          title: 'Error!',
          text: 'Connection error. Please, try again.',
          button: {
            text: 'Ok!',
            closeModal: true,
            className: 'container-form-btn p-t-20 form-btn'
          }
        });
      });
    });
  }

  deleteTask() {
    deleteTaskRequest(this.state.p_id, this.state.t_id).then(() => {
      this.state.deleteFromProject(this.state.t_id);
      this.forceUpdate();
    }).catch(error => {
      swal({
        title: 'Error!',
        text: 'Connection error. Please, try again.',
        button: {
          text: 'Ok!',
          closeModal: true,
          className: 'container-form-btn p-t-20 form-btn'
        }
      });
    });;
  }
};
