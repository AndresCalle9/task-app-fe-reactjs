import TaskItem from '../TaskItem/TaskItem';
import { useTasks } from '../../context/UseTask';

function TasksList() {
  const { tasks } = useTasks();

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
