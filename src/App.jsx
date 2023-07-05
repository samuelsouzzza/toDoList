import React from 'react';
import Tasks from './components/Tasks/Tasks';
import './App.css';

const App = () => {
  return (
    <div className='container'>
      <section className='card'>
        <div className='boxTasks'>
          <Tasks />
        </div>
        <div className='boxInput'>
          <input
            type='text'
            placeholder='O que você precisa fazer hoje?'
            className='inputTask'
          />
          <button className='btnSaveTask'>SALVAR</button>
        </div>
      </section>
    </div>
  );
};

export default App;
