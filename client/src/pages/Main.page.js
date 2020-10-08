import React from 'react';
import cookie from 'react-cookies';
import {
  Redirect,
  Link
} from 'react-router-dom';
import swal from 'sweetalert';

import Project from '../components/Project';
import { getProjectsRequest, postProjectRequest } from '../hooks/Request.hook';


export default class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      projects: undefined,
      is_loaded: false,
      loading_error: false
    };

    this.loadProjects = this.loadProjects.bind(this);
    this.addProject = this.addProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  render() {
    const is_logged_in = cookie.load('userID') !== undefined;

    if(!is_logged_in) {
      return this.redirectToSignIn();
    }

    if(this.state.is_loaded) {
      return this.displayMain();
    }

    return this.displayError();
  }

  redirectToSignIn() {
    return (<Redirect to='/signin' />);
  }

  displayError() {
    return (
      <div>

      </div>
    );
  }

  displayMain() {
    return (
      <div className="container-home">
        <div className="wrap-home p-l-55 p-r-55 p-t-60 p-b-60">
          <div className="row">
            <div className="col-4">
              <div id="project-list" className="list-group project-list-group border-group">
                {this.state.projects.map((element, index) => (
                  <a className="list-group-item" href={`#list-item-${index}`}>{element.title}</a>
                ))}
              </div>
              <div className="container-form-btn p-t-20">
                <button type="button" onClick={this.addProject} className="form-btn">
                  Add project
                </button>
              </div>
              <div className="text-center p-t-57 p-b-20">
                <Link className="txt2 hov1" to="/signin" onClick={this.deleteCookies}>
                  Logout
                </Link>
              </div>
            </div>
            <div className="col-8">
              <div data-spy="scroll" data-target="#project-list" data-offset="1" className="project-scrollspy border-group">
                {this.state.projects.map((element, index) => (
                  <div className="border-group__element">
                    <Project id={`list-item-${index}`} project={element} deleteProject={this.deleteProject} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if((!this.state.is_loaded) && cookie.load('userID') !== undefined) {
      this.loadProjects();
    }
  }

  loadProjects() {
    getProjectsRequest().then((data) => {
      this.setState({
        is_loaded: true,
        projects: data,
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

  addProject() {
    swal({
      text: 'Project name',
      closeOnClickOutside: true,
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Enter new project name'
        }
      },
      button: {
        text: 'Add Project',
        closeModal: true,
        className: 'container-form-btn p-t-20 form-btn'
      }
    }).then(project_title => {
      if(!project_title){
        return
      }

      postProjectRequest({
        title: project_title
      }).then((data) => {
        const new_projects = this.state.projects;

        new_projects.push({
          id: data.p_id,
          title: project_title
        });

        this.setState({
          projects: new_projects
        });
      }).catch(error => {
        swal(
            <div>
                <h1>Error!</h1>        
                <p>Connection error. Please, try again.</p>
            </div>
        );
      });
    });
  }

  deleteProject(p_id) {
    this.setState({
      projects: this.state.projects.filter(project => project.id !== p_id)
    });
  }

  deleteCookies() {
    cookie.remove('userID');
    window.location.reload();
  }
};
