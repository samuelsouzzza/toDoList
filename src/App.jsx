import React from 'react';
import Tasks from './components/Tasks/Tasks';
import './App.css';

const App = () => {
  const templateTasks = [
    {
      id: 1,
      name: 'Minha primeira tarefa',
    },
    {
      id: 2,
      name: 'Minha segunda tarefa',
    },
  ];

  const [valueInput, setValueInput] = React.useState('');
  const [tasks, setTasks] = React.useState(templateTasks);
  const [stateButton, setStateButton] = React.useState(true);

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
  return (
    <div className='container'>
      <section className='card'>
        <div className='boxTasks'>
          <Tasks list={tasks} />
        </div>
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
