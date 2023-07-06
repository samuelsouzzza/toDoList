import React from 'react';
import Tasks from './components/Tasks/Tasks';
import './App.css';

const App = () => {
  const template = [
    {
      id: 1,
      name: 'sdfas',
      time: '12:00',
      date: '12/02/2009',
    },
  ];
  const [valueInput, setValueInput] = React.useState('');
  const [tasks, setTasks] = React.useState(template);
  const [stateButton, setStateButton] = React.useState(true);
  const [count, setCount] = React.useState(tasks.length);

  React.useEffect(() => {
    setCount(tasks.length);
  }, [tasks]);

  function handleChange({ target }) {
    target.value.length === 0 ? setStateButton(true) : setStateButton(false);
    setValueInput(target.value);
  }

  function handleClick() {
    const newTask = {
      id: tasks.length + 1,
      name: valueInput,
    };
    setTasks([...tasks, newTask]);
    setValueInput('');
    setStateButton(true);
  }

  function renderTask() {
    if (tasks.length === 0) {
      return <p className='noTasks'>Não há tarefas</p>;
    } else {
      return <Tasks list={tasks} />;
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
