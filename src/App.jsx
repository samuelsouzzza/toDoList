import React from 'react';
import Tasks from './components/Tasks/Tasks';
import './App.css';

const App = () => {
  const template = [
    {
      id: 1,
      name: 'Crie sua primeira tarefa',
      time: Date.now(),
    },
  ];
  const [valueInput, setValueInput] = React.useState('');
  const [tasks, setTasks] = React.useState(template);
  const [stateButton, setStateButton] = React.useState(true);
  const [count, setCount] = React.useState(tasks.length);
  const [storage, setStorage] = React.useState(JSON.stringify(tasks));

  function convertStringfy(arr) {
    const stringify = JSON.stringify(arr);
    setStorage(stringify);

    localStorage.setItem('tasks', storage);
  }

  React.useEffect(() => {
    setCount(tasks.length);
    convertStringfy(tasks);
  }, [tasks, storage]);

  function handleChange({ target }) {
    target.value.length === 0 ? setStateButton(true) : setStateButton(false);
    setValueInput(target.value);
  }

  function handleClick() {
    function saveTask() {
      const action = Date.now();

      const newTask = {
        id: tasks.length + 1,
        name: valueInput,
        time: action,
      };

      setTasks([...tasks, newTask]);
      setValueInput('');
      setStateButton(true);
    }
    saveTask();
  }

  function deleteTask(idTask) {
    const arr = [...tasks];
    arr.splice(idTask, 1);
    setTasks(arr);
  }

  function renderTask() {
    if (tasks.length === 0) {
      return <p className='noTasks'>Não há tarefas</p>;
    } else {
      return <Tasks list={tasks} erase={deleteTask} />;
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
            SALVAR
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
