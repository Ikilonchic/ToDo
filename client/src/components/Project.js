import React from 'react';
import cookie from 'react-cookies';
import swal from 'sweetalert';

import { MdHighlightOff } from 'react-icons/md';
import { HiPencil, HiOutlinePlus } from 'react-icons/hi';

import { getTasksRequest, deleteProjectRequest, updateProjectRequest, postTaskRequest } from '../hooks/Request.hook';
import Task from './Task';

export default class Project extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      p_id: props.project.id,
      title: props.project.title,
      tasks: undefined,
      is_loaded: false,
      loading_error: false,

      deleteFromMain: props.deleteProject
    };

    this.editProject = this.editProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);

    this.addTask = this.addTask.bind(this);
    this.changeTaskPriority = this.changeTaskPriority.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  render(){
    if(this.state.is_loaded) {
      return this.displayProject();
    }

    return this.displayError();
  }

  displayError() {
    return (
      <center>

      </center>
    );
  }

  displayProject() {
    return(
      <div id={this.state.id} className="project">
        <div className="project__header">
          <div className="project__title">
            {this.state.title}
          </div>
          <div className="project__button-group">
            <button type="button" className="project__button" onClick={this.addTask}>
              <HiOutlinePlus size={20}/>
            </button>
            <button type="button" className="project__button" onClick={this.editProject}>
              <HiPencil size={20} />
            </button>
            <button type="button" className="project__button" onClick={this.deleteProject}>
              <MdHighlightOff size={20}/>
            </button>
          </div>
        </div>
        {this.state.tasks.map((element, index) => (
          <Task key={index} id={index} p_id={this.state.p_id} task={element} deleteTask={this.deleteTask}/>
        ))}
      </div>
    );
  }

  componentDidMount() {
    if((!this.state.is_loaded) && cookie.load('userID') !== undefined) {
      getTasksRequest(this.state.p_id).then((data) => {
        this.setState({
          is_loaded: true,
          tasks: data,
          loading_error: false
        });
      }).catch((error) => {
        this.setState({
          is_loaded: false,
          loading_error: true,
          projects: undefined
        });
      });
    }
  }

  editProject() {
    swal({
      text: "Project name",
      content: "input",
     button: {
      text: "Edit Project",
      value: 'edit_project',
      closeModal: true,
      className: 'container-form-btn p-t-20 form-btn'
    }}).then(project_name =>{
      if(!project_name){
          return
      }

      const project = {
          title: project_name
      }

      updateProjectRequest(this.state.p_id, project).then(() => {
        this.setState({
          title: project.title
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

  deleteProject() {
    deleteProjectRequest(this.state.p_id).then(() => {
      this.state.deleteFromMain(this.state.p_id);
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

  addTask() {
    swal({
      text: 'Task name',
      closeOnClickOutside: true,
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Enter new task name'
        }
      },
      button: {
        text: 'Add Task',
        closeModal: true,
        className: 'container-form-btn p-t-20 form-btn'
      }
    }).then((task_name) => {
      const today = new Date();

      const task = {
        text: task_name,
        deadline: new Date(today.getFullYear(), today.getMonth(), today.getDay() + 7),
        status: false,
        priority: this.state.tasks.length
      };

      postTaskRequest(this.state.p_id, task).then((data) => {
        const new_tasks = this.state.tasks;

        task.id = data.t_id;

        new_tasks.push(task);

        this.setState({
          tasks: new_tasks
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
    })
  }

  changeTaskPriority() {

  }

  deleteTask(t_id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== t_id)
    });
  }
};
