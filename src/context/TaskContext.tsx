import React, { createContext, useState, useEffect, useMemo } from 'react';
import {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from '../api/tasks';
import { CreateTask, Task, UpdateTask } from '../interfaces/task.interface';

interface TaskContentValues {
  tasks: Task[];
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: UpdateTask) => Promise<void>;
}
export const TaskContext = createContext<TaskContentValues>({
  tasks: [],
  createTask: async () => {},
  deleteTask: async () => {},
  updateTask: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const getTasksInfo = async () => {
    const response = await getTasksRequest();
    const data = await response.json();
    setTasks(data);
  };
  useEffect(() => {
    getTasksInfo();
  }, []);

  const createTask = async (task: CreateTask) => {
    const response = await createTaskRequest(task);
    const data = await response.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id: string) => {
    const response = await deleteTaskRequest(id);
    if (response.status == 204) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  const updateTask = async (id: string, task: UpdateTask) => {
    const response = await updateTaskRequest(id, task);
    const data = await response.json();
    setTasks(
      tasks.map((task) => (task._id === id ? { ...task, ...data } : task))
    );
  };

  const memoizedValue = useMemo(
    () => ({ tasks, createTask, deleteTask, updateTask }),
    [tasks, createTask, deleteTask, updateTask]
  );

  return (
    <TaskContext.Provider value={memoizedValue}>
      {children}
    </TaskContext.Provider>
  );
};
