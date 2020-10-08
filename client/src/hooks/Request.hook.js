function convertData(data, type) {
  switch (type) {
    case 'application/json':
      return JSON.stringify(data);
  
    default:
      return data;
  }
}

function request(url, method='GET', body = null, headers = { 'Content-Type': 'application/json' }) {
  const valid_data = convertData(body, headers['Content-Type']);
  
  return fetch(
    url,
    {
      method: method,
      mode: 'cors',
      headers: headers,
      credentials: 'include',
      body: (method === 'GET' || method === 'DELETE') ? null : valid_data
    }
  ).then((response) => {
    return response.json();
  });
}

export function signInRequest(email, pass) {
  const url = '/auth/signin';
  const user_data = {
    'email': email,
    'pass': pass
  };

  return request(url, 'POST', user_data);
}

export function signUpRequest(email, pass) {
  const url = '/auth/signup';
  const user_data = {
    'email': email,
    'pass': pass
  };

  return request(url, 'POST', user_data);
}

export function getProjectsRequest() {
  const url = '/api/projects';

  return request(url);
}

export function postProjectRequest(project_data) {
  const url = '/api/projects';

  return request(url, 'POST', project_data);
}

export function updateProjectRequest(p_id, project_data) {
  const url = `/api/projects/${p_id}`;

  return request(url, 'PUT', project_data);
}

export function deleteProjectRequest(p_id) {
  const url = `/api/projects/${p_id}`;

  return request(url, 'DELETE');
}

export function getTasksRequest(p_id) {
  const url = `/api/projects/${p_id}/tasks`;

  return request(url);
}

export function postTaskRequest(p_id, task_data) {
  const url = `/api/projects/${p_id}/tasks`;

  return request(url, 'POST', task_data);
}

export function updateTaskRequest(p_id, t_id, task_data) {
  const url = `/api/projects/${p_id}/tasks/${t_id}`;

  return request(url, 'PUT', task_data);
}

export function deleteTaskRequest(p_id, t_id) {
  const url = `/api/projects/${p_id}/tasks/${t_id}`;

  return request(url, 'DELETE');
}
