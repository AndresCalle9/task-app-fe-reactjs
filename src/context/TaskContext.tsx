import React, { createContext, useState, useEffect, useMemo } from 'react';
import { getTasksRequest, createTaskRequest } from '../api/tasks';
import { CreateTask, Task } from '../interfaces/task.interface';

interface TaskContentValues {
  tasks: Task[];
  createTask: (task: CreateTask) => void;
}
export const TaskContext = createContext<TaskContentValues>({
  tasks: [],
  createTask: () => {},
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

  const memoizedValue = useMemo(
    () => ({ tasks, createTask }),
    [tasks, createTask]
  );

  return (
    <TaskContext.Provider value={memoizedValue}>
      {children}
    </TaskContext.Provider>
  );
};
