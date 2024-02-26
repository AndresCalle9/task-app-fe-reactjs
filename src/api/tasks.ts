const API = 'http://localhost:3000/api';

import {CreateTask, UpdateTask} from '../interfaces/task.interface'

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

export const deleteTaskRequest = (id: string) => {
    return fetch(`${API}/tasks/${id}`, {
        method: 'DELETE',
    })
}

export const updateTaskRequest = (id: string, task: UpdateTask) => {
    console.log('api',task)
    return fetch(`${API}/tasks/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}
