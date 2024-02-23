import { useState, useEffect } from 'react';
import { getTasksRequest } from '../../api/tasks';
import { Task } from '../../interfaces/task.interface';
import TaskItem from '../TaskItem/TaskItem';

function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const getTasksInfo = async () => {
    const response = await getTasksRequest();
    const data = await response.json();
    setTasks(data);
  };
  useEffect(() => {
    getTasksInfo();
  }, []);
  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksList;
