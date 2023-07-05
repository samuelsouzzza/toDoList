import React from 'react';
import Tasks from './components/Tasks/Tasks';
import './App.css';

const App = () => {
  return (
    <div className='container'>
      <section className='card'>
        <div className='boxTasks'>
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
        </div>
        <div className='boxInput'>sadf</div>
      </section>
    </div>
  );
};

export default App;
