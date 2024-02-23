const API = 'http://localhost:3000/api';

import {CreateTask} from '../interfaces/task.interface'

export const createTaskRequest = (task: CreateTask) => {
    return fetch(`${API}/tasks`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}

export const getTasksRequest = () => {
    return fetch(`${API}/tasks`)
}