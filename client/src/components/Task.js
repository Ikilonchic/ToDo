import React from 'react';
import swal from 'sweetalert';
import swalWithReact from '@sweetalert/with-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MdHighlightOff, MdDone, MdDoneAll } from 'react-icons/md';
import { HiPencil, HiCalendar, HiChevronUp, HiChevronDown } from 'react-icons/hi';
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
      new_deadline: new Date(props.task.deadline ? props.task.deadline : null),
      priority: props.task.priority,

      deleteFromProject: props.deleteTask
    };

    this.changePriority = this.changePriority.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeDeadline = this.changeDeadline.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.watchDeadline = this.watchDeadline.bind(this);
  }

  render(){
    return this.displayTask();
  }

  displayTask() {
    return (
      <div id={this.state.id} className="task">
        <div className="task__body">
          <div className="task__title" title={`${this.state.deadline.getFullYear()}/${this.state.deadline.getMonth()}/${this.state.deadline.getDay()} Pripriority: ${this.state.priority + 1}`}>
            {(this.state.status) ? <MdDoneAll /> : <BsDot />} {this.state.text}
          </div>
          <div className="task__button-group">
            <button type="button" className="task__button" onClick={this.changePriority(1)}>
              <HiChevronUp />
            </button>
            <button type="button" className="task__button" onClick={this.changePriority(-1)}>
              <HiChevronDown />
            </button>
            <button type="button" className="task__button" onClick={this.changeStatus}>
              <MdDone />
            </button>
            <button type="button" className="task__button" onClick={this.editTask}>
              <HiPencil />
            </button>
            <button type="button" className="task__button" onClick={this.changeDeadline}>
              <HiCalendar />
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

  changePriority(how) {
    return () => {
      const new_priority = (this.state.priority === 0 && how === 1) ? 0 : this.state.priority - how;

      updateTaskRequest(this.state.p_id, this.state.t_id, {
        priority: new_priority
      }).then(() => {
        this.setState({
          priority: new_priority
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
    };
  }

  changeDeadline() {
    swalWithReact(
      <DatePicker className='projectTaskAddDate' dateFormat='dd/MM/yyyy'
      placeholderText='day/month/year' onChange={this.watchDeadline}/>,
      {
        button: {
          text: "Edit date",
          value: 'edit_date',
          closeModal: true,
          className: 'container-form-btn p-t-20 form-btn'
        } 
      }
    ).then((edit) => {
      if(edit !== 'edit_date') {
        return
      }
      
      updateTaskRequest(this.state.p_id, this.state.t_id, {
        deadline: this.state.new_deadline 
      }).then(() => {
        this.setState({
          deadline: this.state.new_deadline
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

  watchDeadline(deadline) {
    this.setState({
      new_deadline: deadline !== null ? new Date(deadline) : this.state.deadline
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
