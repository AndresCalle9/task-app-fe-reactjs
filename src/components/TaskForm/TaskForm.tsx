import { ChangeEvent, useState } from 'react';
import { useTasks } from '../../context/UseTask';

function TaskForm() {
  const [task, setTask] = useState({ title: '', description: '', done: false });
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const { createTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    createTask(task);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2'
          placeholder='Write a title'
          type='text'
          name='title'
          onChange={handleInputChange}
        />
        <textarea
          className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2'
          placeholder='Write a description'
          name='description'
          rows={3}
          onChange={handleInputChange}
        ></textarea>
        <label className='inline-flex items-center gap-x-2' htmlFor=''>
          <input
            className='h-5 w-5 text-indigo-600 '
            type='checkbox'
            onChange={() => setTask({ ...task, done: !task.done })}
          />{' '}
          <span>Done</span>
        </label>
        <button className='bg-indigo-500 px-3 block py-2 w-full'>Save</button>
      </form>
    </div>
  );
}

export default TaskForm;
