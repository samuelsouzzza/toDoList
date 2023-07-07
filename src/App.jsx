import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import './App.css';

const App = () => {
  const [valueInput, setValueInput] = useState('');

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [stateButton, setStateButton] = useState(true);
  const [count, setCount] = useState(tasks.length);

  useEffect(() => {
    setCount(tasks.length);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleChange({ target }) {
    target.value.length === 0 ? setStateButton(true) : setStateButton(false);
    setValueInput(target.value);
  }

  function handleClick() {
    const action = Date.now();

    const newTask = {
      id: tasks.length + 1,
      name: valueInput,
      time: action,
      checked: false,
    };

    setTasks([...tasks, newTask]);
    setValueInput('');
    setStateButton(true);
  }

  function deleteTask(idTask) {
    const arr = [...tasks];
    arr.splice(idTask, 1);
    setTasks(arr);
  }

  function changeCheck(index) {
    const updateTask = [...tasks];
    updateTask[index].checked = !updateTask[index].checked;
    setTasks(updateTask);
  }

  function renderTask() {
    if (tasks.length === 0) {
      return <p className='noTasks'>Não há tarefas</p>;
    } else {
      return <Tasks list={tasks} erase={deleteTask} onOffCheck={changeCheck} />;
    }
  }

  return (
    <div className='container'>
      <section className='card'>
        <span className='countTasks'>{count}/10 tarefas</span>
        <div className='boxTasks'>{renderTask()}</div>
        <div className='boxInput'>
          <input
            type='text'
            placeholder='O que você precisa fazer hoje?'
            className='inputTask'
            value={valueInput}
            onChange={handleChange}
          />
          <button
            className='btnSaveTask'
            onClick={handleClick}
            disabled={stateButton}
          >
            Salvar
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
