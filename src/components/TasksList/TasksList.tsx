import { useState, useEffect } from 'react';
import { getTasksRequest } from '../../api/tasks';
import { Task } from '../../interfaces/task.interface';

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
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span>{task.done ? 'Done' : 'Pending'}</span>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
