import React from 'react';
import Tasks from './components/Tasks/Tasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faSave } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [valueInput, setValueInput] = React.useState('');

  const [tasks, setTasks] = React.useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [stateButton, setStateButton] = React.useState(true);
  const [count, setCount] = React.useState(tasks.length);
  const [error, setError] = React.useState(false);

  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'dark';
  });
  const root = document.querySelector(':root');

  React.useEffect(() => {
    localStorage.setItem('theme', theme);
    root.removeAttribute('class');
    root.classList.add(theme);
  }, [theme]);

  React.useEffect(() => {
    setCount(tasks.length);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTheme(theme);
  }, [tasks]);

  function handleChange({ target }) {
    target.value.length === 0 ? setStateButton(true) : setStateButton(false);
    setValueInput(target.value);
  }

  function handleClick() {
    if (tasks.length === 5) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
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

  function changeTheme() {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme == 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='container'>
      <h1 className='title' translate='no'>
        TO::TASKS
      </h1>
      <section className='card'>
        {error && <span className='error'>Contrate o plano premium!</span>}
        <div className='boxTools'>
          <span className='countTasks'>{count}/5 tarefas</span>
          <FontAwesomeIcon
            onClick={changeTheme}
            icon={faSun}
            className='iconTheme'
          />
        </div>
        <div className='boxTasks'>{renderTask()}</div>
        <div className='boxInput'>
          <input
            type='text'
            placeholder='O que você precisa fazer hoje?'
            className='inputTask'
            maxLength={45}
            value={valueInput}
            onChange={handleChange}
          />
          <button
            className='btnSaveTask'
            onClick={handleClick}
            disabled={stateButton}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
